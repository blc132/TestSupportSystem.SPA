import React, { Fragment, useContext } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IExercise } from '../../../app/models/exercise'
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ADMINISTRATOR_ROLE, LECTURER_ROLE, MAINLECTURER_ROLE, STUDENT_ROLE } from '../../../app/common/roles/roles';

interface IProps {
    exercise: IExercise
}

const ExerciseCard: React.FC<IProps> = ({ exercise }) => {

    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    return (
        <Fragment>
            <Card>
                <Card.Content>
                    {user && user.role === STUDENT_ROLE && (
                        <Card.Header>{exercise.name}</Card.Header>
                    )}
                    {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && (
                        <Card.Header as={Link} to={`/exercise/${exercise.id}`}>{exercise.name}</Card.Header>
                    )}
                    <Card.Meta>{exercise.author.firstName + " " + exercise.author.lastName}</Card.Meta>
                    <Card.Meta>{exercise.author.email}</Card.Meta>
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default ExerciseCard;
