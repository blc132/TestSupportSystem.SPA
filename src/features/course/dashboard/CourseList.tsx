import React, { useContext, Fragment } from 'react';
import { Item, Label, Card, Button, Image, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';

const GroupList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { courses, loadCourses } = rootStore.courseStore;
    loadCourses();

    return (
        <Segment>
            <Card>
                <Card.Content>
                    <Card.Header><h1>Kursy</h1></Card.Header>
                </Card.Content>
            </Card>
            <Card.Group>
                {courses.map((course) => (
                    <Card>
                        <Card.Content>
                            <Card.Header>{course.name}</Card.Header>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Segment>
    );
};

export default observer(GroupList);
