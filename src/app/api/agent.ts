import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues, IAddUserToGroupFormValues } from '../models/user';
import { ICourse } from '../models/course';
import { IGroupFormValues, IGroup, IGroupDetails } from '../models/group';
import { IAddExerciseFormValues, IExercise, IExerciseDetails } from '../models/exercise';

axios.defaults.baseURL = "https://localhost:44323/api"

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Błąd sieci - upewnij się, że API działa!');
  }
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (status === 401 && headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"') {
    window.localStorage.removeItem('jwt');
    history.push('/')
    toast.info('Twoja sesja wygasła, zaloguj się ponownie.')
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }
  if (status === 500) {
    toast.error('Błąd serwera - sprawdź konsolę, aby uzyskać więcej informacji!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(responseBody),
};

const Users = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
  list: (): Promise<IUser[]> => requests.get('/user/all'),
  getByEmail: (email: string): Promise<IUser> => requests.get('/user/getByEmail/' + email)
};

const Courses = {
  create: (course: ICourse) => requests.post('/course', course),
  list: (): Promise<ICourse[]> => requests.get('/course'),
}

const Groups = {
  create: (group: IGroupFormValues) => requests.post('/group', group),
  list: (): Promise<IGroup[]> => requests.get('/group'),
  getByName: (name: string): Promise<IGroup> => requests.get('/group/getbyname/' + name),
  getById: (id: string): Promise<IGroupDetails> => requests.get('/group/' + id),
  addUserByEmail: (values: IAddUserToGroupFormValues) => requests.post("/group/" + values.groupId + "/userEmail/" + values.email, {}),

}

const Exercises = {
  create: (exercise: IAddExerciseFormValues) => requests.post('/exercise', exercise),
  list: (): Promise<IExercise[]> => requests.get('/exercise'),
  getById: (id: string): Promise<IExerciseDetails> => requests.get('/exercise/' + id),
}

export default {
  Users,
  Courses,
  Groups,
  Exercises
};
