import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues, IUserDetails } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { toast } from 'react-toastify';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable users: IUser[] = [];
  @observable userDetails: IUserDetails | null = null
  @observable studentId: string = ""
  @observable submitting = false;
  @observable loadingInitial = false;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.Users.login(values);
      runInAction(() => {
        this.user = user;
        this.user.role = user.role;
        this.studentId = user.id;
      });
      this.rootStore.commonStore.setToken(user.token!);
      this.rootStore.modalStore.closeModal();
      history.push('/home');
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.Users.register(values);
      this.rootStore.commonStore.setToken(user.token!);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.modalStore.closeModal();
      history.push('/home')
    } catch (error) {
      throw error;
    }
  }

  @action registerUser = async (values: IUserFormValues) => {
    this.submitting = true;
    try {
      await agent.Users.register(values);
      runInAction('adding group to list', () => {
        this.users = [...this.users, values!]
      });
      this.rootStore.modalStore.closeModal();
      toast.info('Zarejestrowano użytkownika');
    } catch (error) {
      runInAction('register user error', () => {
        this.submitting = false;
      });
      toast.error('Błąd przesyłania danych');
      console.log(error.response);
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.Users.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      history.push("/")
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };

  @action loadUsers = async () => {
    this.loadingInitial = true;
    try {
      const users = await agent.Users.list();
      runInAction('loading users', () => {
        users.forEach(user => {
          if (this.users.find(x => x.email == user.email) == null)
            this.users = [...this.users, user]
        });
        this.users = this.users.sort((a, b) => a.lastName.localeCompare(b.lastName))
      });
      this.loadingInitial = false;
    } catch (error) {
      runInAction('load users error', () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadUserDetails = async (email: string) => {
    this.loadingInitial = true;
    try {
      const userDetails = await agent.Users.getDetailsByEmail(email);
      runInAction('loading user details', () => {
        this.userDetails = userDetails;
        this.studentId = userDetails.id;
      });
      this.loadingInitial = false;
    } catch (error) {
      runInAction('load users error', () => {
        this.loadingInitial = false;
      });
    }
  };
}
