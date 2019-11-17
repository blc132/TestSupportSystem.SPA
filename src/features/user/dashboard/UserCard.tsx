import React, { Fragment, useContext } from 'react';
import { Card } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user'
import { STUDENT_ROLE, ADMINISTRATOR_ROLE, LECTURER_ROLE, MAINLECTURER_ROLE } from '../../../app/common/roles/roles';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
    student: IUser
}

const UserCard: React.FC<IProps> = ({ student }) => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    return (
        <Fragment>
            <Card>
                <Card.Content>
                    {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && (
                        <Card.Header as={Link} to={`/user/profile/${student.email}`}>{student.email}</Card.Header>
                    )}
                    {user && user.role === STUDENT_ROLE && (
                        <Card.Header>{student.email}</Card.Header>
                    )}
                    <Card.Meta>{student.firstName + " " + student.lastName}</Card.Meta>
                    <Card.Meta>{student.userName}</Card.Meta>
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default UserCard;
