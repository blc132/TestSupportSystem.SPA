import React, { Fragment, useContext, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { IExerciseOverview } from '../../../app/models/exercise'
import { Link, match } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ADMINISTRATOR_ROLE, LECTURER_ROLE, MAINLECTURER_ROLE, STUDENT_ROLE } from '../../../app/common/roles/roles';

interface IProps {
    exercise: IExerciseOverview
    studentId: string
}

const ExerciseSolvedCard: React.FC<IProps> = ({ exercise, studentId }) => {

    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    const { groupDetails } = rootStore.groupStore;

    return (
        <Fragment>
            <Card color="green">
                <Card.Content>
                    {user && (
                        <Card.Header as={Link} to={`/exercise/solved/${exercise.id}/group/${groupDetails!.id}/user/${studentId}`}>{exercise.name}</Card.Header>
                    )}
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default ExerciseSolvedCard;
