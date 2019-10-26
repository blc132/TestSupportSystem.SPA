import React, { Fragment } from 'react';
import { Card, Image, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUser } from '../../../app/models/user'
import UserCard from './UserCard';

interface IProps {
    users: IUser[]
    groupName: string
}

const UsersCardsGroup: React.FC<IProps> = ({ users, groupName }) => {
    return (
        <Fragment>
            <Divider horizontal>{groupName}</Divider>
            <Card.Group>
                {users.map((user) => (
                    <UserCard user={user} />
                ))}
            </Card.Group>
        </Fragment>
    );
};

export default UsersCardsGroup;
