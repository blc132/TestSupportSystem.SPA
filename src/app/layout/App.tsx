import React, { useContext, useEffect, Fragment } from 'react';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import { ToastContainer } from 'react-toastify';
import NavBar from '../../features/nav/NavBar';
import LandingPage from '../../features/landing/LandingPage';
import HomePage from '../../features/home/HomePage';
import ModalContainer from '../common/modals/ModalContainer';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NotFound from './NotFound';
import GroupList from '../../features/group/dashboard/GroupList'
import GroupDetails from '../../features/group/details/GroupDetails'
import CourseList from '../../features/course/dashboard/CourseList'
import UserList from '../../features/user/dashboard/UserList'
import SolveExercise from '../../features/exercise/SolveExercise'

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Ładowanie...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={LandingPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/home' component={HomePage} />
                <Route exact path='/groups' component={GroupList} />
                <Route exact path='/courses' component={CourseList} />
                <Route exact path='/users' component={UserList} />
                <Route exact path='/group/:id' component={GroupDetails} />
                <Route exact path='/exercise' component={SolveExercise} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));