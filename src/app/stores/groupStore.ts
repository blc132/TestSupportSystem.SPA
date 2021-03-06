import { RootStore } from './rootStore';
import { observable, runInAction, action } from 'mobx';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { IGroup, IGroupFormValues, IGroupDetails, IAddExerciseToGroupForm } from '../models/group';
import { IAddUserToGroupFormValues } from '../models/group';

export default class GroupStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable group: IGroup | null = null;
  @observable groupDetails: IGroupDetails | null = null;
  @observable groups: IGroup[] = [];
  @observable groupId: string = "";
  @observable submitting = false;
  @observable loadingInitial = false;

  @action createGroup = async (group: IGroupFormValues) => {
    this.submitting = true;
    console.log(group);
    try {
      await agent.Groups.create(group);
      runInAction('create group', () => {
        this.submitting = false;
      });
      this.rootStore.modalStore.closeModal();
      let groupFromDb = await agent.Groups.getByName(group.name)

      runInAction('adding group to list', () => {
        this.groups = [...this.groups, groupFromDb]
      });
      toast.info('Dodano grupę');
    } catch (error) {
      runInAction('create group error', () => {
        this.submitting = false;
      });
      toast.error('Błąd przesyłania danych');
      console.log(error.response);
    }
  };

  @action loadGroups = async () => {
    this.loadingInitial = true;
    try {
      const groups = await agent.Groups.list();
      runInAction('loading groups', () => {
        this.groups = groups;
        this.groups = this.groups.sort((a, b) => a.name.localeCompare(b.name))
      });
      this.loadingInitial = false;
    } catch (error) {
      runInAction('load groups options error', () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadGroupDetails = async (id: string) => {
    this.loadingInitial = true;
    try {
      const group = await agent.Groups.getById(id);
      runInAction('loading group', () => {
        this.groupDetails = group;
        this.groupDetails.members = this.groupDetails.members.sort((a, b) => a.lastName.localeCompare(b.lastName))
        this.groupDetails.exercises = this.groupDetails.exercises.sort((a, b) => a.name.localeCompare(b.name))
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load group error', () => {
        this.loadingInitial = false;

      });
    }
  };

  @action addUser = async (values: IAddUserToGroupFormValues) => {
    this.submitting = true;
    try {
      await agent.Groups.addUserByEmail(values);
      runInAction('add user to group', () => {
        this.submitting = false;
      });
      let userFromDb = await agent.Users.getByEmail(values.email)

      runInAction('adding user to group list', () => {
        if (this.groupDetails)
          this.groupDetails.members = [...this.groupDetails.members, userFromDb]
      });
      toast.info('Dodano użytkownika');
    } catch (error) {

      runInAction('adding user to group list error', () => {
        this.submitting = false;
      });

      toast.error(JSON.stringify(error.data.errors).replace(/"/g, '').replace(/{/g, '').replace(/}/g, ''));
      throw error;
    }
  };

  @action addExercise = async (values: IAddExerciseToGroupForm) => {
    this.submitting = true;
    try {
      await agent.Groups.addExerciseByName(values);
      runInAction('add exercise to group', () => {
        this.submitting = false;
      });
      let exercise = this.rootStore.exerciseStore.exercises.find(x => x.name == values.exerciseName)

      if (!exercise) {
        const exercises = await agent.Exercises.list();
        runInAction('adding exercise to group list', () => {
          this.rootStore.exerciseStore.exercises = exercises
        });
      }

      exercise = this.rootStore.exerciseStore.exercises.find(x => x.name == values.exerciseName);

      console.log(exercise)
      runInAction('adding exercise to group list', () => {
        if (this.groupDetails && exercise)
          this.groupDetails.exercises = [...this.groupDetails.exercises, exercise]
      });
      toast.info('Dodano zadanie');
    } catch (error) {

      runInAction('adding exercise to group list error', () => {
        this.submitting = false;
      });

      toast.error(JSON.stringify(error.data.errors).replace(/"/g, '').replace(/{/g, '').replace(/}/g, ''));
      throw error;
    }
  };


  @action setGroupId = async (groupId: string) => {
    this.loadingInitial = true;
    try {
      runInAction('set groupId', () => {
        this.groupId = groupId;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('set groupId error', () => {
        this.loadingInitial = false;

      });
    }
  }
}


