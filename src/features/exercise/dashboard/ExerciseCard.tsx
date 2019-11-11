import React, { Fragment, useContext } from 'react';
import { Card } from 'semantic-ui-react';
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
    const color = exercise.solved ? "green" : "black"

    return (
        <Fragment>
            <Card color={color}>
                <Card.Content>
                    {user && user.role === STUDENT_ROLE && exercise.solved && (
                        <Fragment>
                            <Card.Header as={Link} to={`/exercise/solved/${exercise.id}`}>{exercise.name}</Card.Header>
                            <Card.Meta>Rozwiązane</Card.Meta>
                        </Fragment>
                    )}
                    {user && user.role === STUDENT_ROLE && !exercise.solved && (
                        <Card.Header as={Link} to={`/exercise/solve/${exercise.id}`}>{exercise.name}</Card.Header>
                    )}
                    {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && (
                        <Fragment>
                            <Card.Header color="black" as={Link} to={`/exercise/${exercise.id}`}>{exercise.name}</Card.Header>
                            <Card.Meta>{exercise.author.firstName + " " + exercise.author.lastName}</Card.Meta>
                            <Card.Meta>{exercise.author.email}</Card.Meta>
                        </Fragment>
                    )}
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default ExerciseCard;
