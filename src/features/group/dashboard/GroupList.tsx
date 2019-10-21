import React, { useContext, Fragment } from 'react';
import { Item, Label, Card, Button, Image, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';

const GroupList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { groups, loadGroups } = rootStore.groupStore;
    loadGroups();

    return (
        <Segment>
            <Card>
                <Card.Content>
                    <Card.Header><h1>Grupy</h1></Card.Header>
                </Card.Content>
            </Card>
            <Card.Group>
                {groups.map((group) => (
                    <Card>
                        <Card.Content>
                            <Card.Header as={Link} to={`/group/${group.id}`}>{group.name}</Card.Header>
                            <Card.Meta>{group.course.name}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Card.Meta>Zarządzaj studentami</Card.Meta>
                            <div className='ui two buttons'>

                                <Button color='green'>
                                    Dodaj
          </Button>
                                <Button color='red'>
                                    Usuń
          </Button>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Segment>
    );
};

export default observer(GroupList);
