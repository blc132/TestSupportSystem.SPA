import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IExercise, IExerciseOverview } from '../../../app/models/exercise';
import ExerciseCard from './ExerciseCard';

interface IProps {
    exercises: IExerciseOverview[]
    courseName: string
}

const ExercisesCardsGroup: React.FC<IProps> = ({ exercises, courseName }) => {
    return (
        exercises.length === 0 ?
            <Fragment>
            </Fragment> :
            <Fragment>
                <Divider horizontal>{courseName}</Divider>
                <Card.Group>
                    {exercises.map((exercise) => (
                        <ExerciseCard exercise={exercise} />
                    ))}
                </Card.Group>
            </Fragment>
    );
};

export default ExercisesCardsGroup;
