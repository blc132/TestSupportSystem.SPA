import React, { useContext, useEffect, Fragment } from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ExercisesCardsGroup from './ExercisesCardsGroup';

const UserList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { courses, loadCourses } = rootStore.courseStore;
    const { exercises, loadExercises, loadingInitialExercise } = rootStore.exerciseStore;

    useEffect(() => {
        loadExercises();
        loadCourses();
    }, [loadExercises, loadCourses]);

    if (loadingInitialExercise) return <LoadingComponent content='Ładowanie zadań...' />;
    return (
        <Segment>
            <Divider horizontal><h1>Zadania</h1></Divider>
            {courses.map(course => (
                <Fragment>
                    <ExercisesCardsGroup exercises={exercises.filter(exercise => exercise.course.name === course.name)} courseName={course.name} />
                </Fragment>
            ))}
        </Segment>
    )
}
export default observer(UserList);
