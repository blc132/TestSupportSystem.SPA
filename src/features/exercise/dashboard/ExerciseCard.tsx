import React, { Fragment, useContext, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { IExerciseOverview } from '../../../app/models/exercise'
import { Link, match } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ADMINISTRATOR_ROLE, LECTURER_ROLE, MAINLECTURER_ROLE, STUDENT_ROLE } from '../../../app/common/roles/roles';

interface IProps {
    exercise: IExerciseOverview
}

const ExerciseCard: React.FC<IProps> = ({ exercise }) => {

    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    const { groupDetails } = rootStore.groupStore;

    return (
        <Fragment>
            <Card color="black">
                <Card.Content>
                    {user && user.role === STUDENT_ROLE && (
                        <Card.Header as={Link} to={`/exercise/solve/${exercise.id}/group/${groupDetails!.id}`}>{exercise.name}</Card.Header>
                    )}
                    {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && (
                        <Fragment>
                            <Card.Header color="black" as={Link} to={`/exercise/${exercise.id}`}>{exercise.name}</Card.Header>
                        </Fragment>
                    )}
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default ExerciseCard;
