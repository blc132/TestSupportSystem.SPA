import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IExercise, IExerciseOverview } from '../../../app/models/exercise';
import ExerciseCard from '../../exercise/dashboard/ExerciseCard';

interface IProps {
    exercises: IExerciseOverview[]
    groupName: string
    studentId?: string;
}

const UserGroup: React.FC<IProps> = ({ exercises, groupName, studentId }) => {
    return (
        <Fragment>
            <Divider horizontal>{groupName}</Divider>
            <Card.Group>
                {exercises.map((exercise) => (
                    <ExerciseCard exercise={exercise} studentId={studentId} />
                ))}
            </Card.Group>
        </Fragment>
    );
};

export default UserGroup;
