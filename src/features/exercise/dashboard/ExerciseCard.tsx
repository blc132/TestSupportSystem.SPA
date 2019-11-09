import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IExercise } from '../../../app/models/exercise'

interface IProps {
    exercise: IExercise
}

const ExerciseCard: React.FC<IProps> = ({ exercise }) => {
    return (
        <Fragment>
            <Card>
                <Card.Content>
                    <Card.Header>{exercise.name}</Card.Header>
                    <Card.Meta>{exercise.author.firstName + " " + exercise.author.lastName}</Card.Meta>
                    <Card.Meta>{exercise.author.email}</Card.Meta>
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default ExerciseCard;
