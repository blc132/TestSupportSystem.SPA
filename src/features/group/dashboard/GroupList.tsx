import React, { useContext, useEffect } from 'react';
import { Card, Button, Segment, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const GroupList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { groups, loadGroups, loadingInitial } = rootStore.groupStore;

    useEffect(() => {
        loadGroups();
    }, [loadGroups]);

    if (loadingInitial) return <LoadingComponent content='Ładowanie grup...' />;

    return (
        <Segment>
            <Divider horizontal><h1>Grupy</h1></Divider>
            <Card.Group>
                {groups.map((group) => (
                    <Card>
                        <Card.Content>
                            <Card.Header as={Link} to={`/group/${group.id}`}>{group.name}</Card.Header>
                            <Card.Meta>{group.course.name}</Card.Meta>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Segment>
    );
};

export default observer(GroupList);
