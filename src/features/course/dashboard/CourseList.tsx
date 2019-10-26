import React, { useContext, useEffect } from 'react';
import { Card, Segment, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const GroupList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { courses, loadCourses, loadingInitial } = rootStore.courseStore;

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    if (loadingInitial) return <LoadingComponent content='Ładowanie kursów...' />;

    return (
        <Segment>
            <Divider horizontal><h1>Kursy</h1></Divider>
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
