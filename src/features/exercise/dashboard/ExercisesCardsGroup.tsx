import React, { Fragment } from 'react';
import { Card, Image, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../app/models/user'
import { IExercise } from '../../../app/models/exercise';
import ExerciseCard from './ExerciseCard';

interface IProps {
    exercises: IExercise[]
    courseName: string
}

const ExercisesCardsGroup: React.FC<IProps> = ({ exercises, courseName }) => {
    return (
        exercises.length == 0 ?
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
