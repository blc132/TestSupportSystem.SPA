import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user'

interface IProps {
    user: IUser
}

const UserCard: React.FC<IProps> = ({ user }) => {
    return (
        <Fragment>
            <Card>
                <Card.Content>
                    <Card.Header>{user.email}</Card.Header>
                    <Card.Meta>{user.firstName + " " + user.lastName}</Card.Meta>
                    <Card.Meta>{user.userName}</Card.Meta>
                </Card.Content>
            </Card>
        </Fragment>
    );
};

export default UserCard;
