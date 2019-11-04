import React, { useContext, useEffect, Fragment } from 'react';
import { Card, Segment, Divider, Button, Input, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import AddUserToGroupForm from '../../group/adduser/AddUserToGroupForm'
import { ADMINISTRATOR_ROLE, MAINLECTURER_ROLE, LECTURER_ROLE, STUDENT_ROLE } from '../../../app/common/roles/roles';
import UsersCardsGroup from '../../user/dashboard/UsersCardsGroup';

interface DetailParams {
  id: string;
}

const GroupDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { groupDetails, loadGroupDetails, loadingInitial } = rootStore.groupStore;
  const { user } = rootStore.userStore;

  useEffect(() => {
    loadGroupDetails(match.params.id);
  }, [loadGroupDetails, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Ładowanie grupy...' />;

  if (!groupDetails) return <h2>Nie znaleziono grupy</h2>;

  return (
    <Fragment>
      <Grid verticalAlign='middle'>
        <Grid.Column width={3}>
          <Segment>
            <AddUserToGroupForm groupId={groupDetails.id} />
          </Segment>
        </Grid.Column>

        <Grid.Column width={13}>
          <Segment>
            <Divider horizontal><h1>{groupDetails.name}</h1></Divider>
            <Divider horizontal><h3>{groupDetails.course.name}</h3></Divider>
            {user && user.role === ADMINISTRATOR_ROLE && (
              <Fragment>
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role == MAINLECTURER_ROLE)} groupName="Główni prowadzący" />
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role == LECTURER_ROLE)} groupName="Prowadzący" />
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role == STUDENT_ROLE)} groupName="Studenci" />
              </Fragment>
            )}
            {user && user.role === MAINLECTURER_ROLE && (
              <Fragment>
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role == LECTURER_ROLE)} groupName="Prowadzący" />
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role == STUDENT_ROLE)} groupName="Studenci" />
              </Fragment>
            )}
            {user && user.role === LECTURER_ROLE && (
              <Fragment>
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role == STUDENT_ROLE)} groupName="Studenci" />
              </Fragment>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>



  );
};

export default observer(GroupDetails);
