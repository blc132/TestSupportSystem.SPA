import React, { useContext, useEffect, Fragment } from 'react';
import { Grid, Card, Segment, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const GroupDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { groupDetails, loadGroupDetails, loadingInitial } = rootStore.groupStore;

  useEffect(() => {
    loadGroupDetails(match.params.id);
  }, [loadGroupDetails, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Ładowanie grupy...' />;

  if (!groupDetails) return <h2>Nie znaleziono grupy</h2>;

  return (
    <Segment placeholder>
      <Card>
        <Card.Content>
          <Card.Header><h1>{groupDetails.name}</h1></Card.Header>
          <Card.Meta>{groupDetails.course.name}</Card.Meta>
        </Card.Content>
      </Card>
      <Divider horizontal>Prowadzący</Divider>
      <Card.Group>
        {groupDetails.members.map((member) => (
          <Card>
            <Card.Content>
              <Card.Header>{member.firstName + " " + member.lastName}</Card.Header>
              <Card.Meta>{member.userName}</Card.Meta>
              <Card.Meta>{member.email}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Divider horizontal>Studenci</Divider>
    </Segment>



  );
};

export default observer(GroupDetails);
