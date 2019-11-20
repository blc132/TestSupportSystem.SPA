import React, { Fragment, useContext } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IExerciseOverview } from '../../../app/models/exercise';
import ExerciseCard from './ExerciseCard';
import ExerciseSolvedCard from './ExerciseSolvedCard';
import { IUser } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
    exercises: IExerciseOverview[]
    courseName: string
}

const ExercisesCardsGroup: React.FC<IProps> = ({ exercises, courseName }) => {
    const rootStore = useContext(RootStoreContext);
    const { studentId } = rootStore.userStore;
    return (
        exercises.length === 0 ?
            <Fragment>
            </Fragment> :
            <Fragment>
                <Divider horizontal>{courseName}</Divider>
                <Card.Group>
                    {exercises.map((exercise) => (
                        (exercise.solved && exercise.solved === true) ?
                            <ExerciseSolvedCard exercise={exercise} studentId={studentId} /> : <ExerciseCard exercise={exercise} />
                    ))}
                </Card.Group>
            </Fragment>
    );
};

export default ExercisesCardsGroup;
