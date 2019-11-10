import React, { useContext, useEffect, Fragment } from 'react';
import { Segment, Divider, Grid } from 'semantic-ui-react';
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
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Divider horizontal><h1>{groupDetails.name}</h1></Divider>
              <Divider horizontal><h3>{groupDetails.course.name}</h3></Divider>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={13}>
            <Segment>
              <Fragment>
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role === MAINLECTURER_ROLE)} groupName="Główni prowadzący" />
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role === LECTURER_ROLE)} groupName="Prowadzący" />
                <UsersCardsGroup users={groupDetails.members.filter(x => x.role === STUDENT_ROLE)} groupName="Studenci" />
              </Fragment>
            </Segment>
          </Grid.Column>
          {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && (
            <Grid.Column width={3}>
              <Segment>
                <AddUserToGroupForm groupId={groupDetails.id} />
              </Segment>
            </Grid.Column>
          )}
        </Grid.Row>

      </Grid>
    </Fragment>



  );
};

export default observer(GroupDetails);
