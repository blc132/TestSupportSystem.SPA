import React, { Fragment } from 'react';
import { Card, Divider } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user'
import UserCard from './UserCard';

interface IProps {
    users: IUser[]
    groupName: string
}

const UsersCardsGroup: React.FC<IProps> = ({ users, groupName }) => {
    return (
        users.length == 0 ?
            <Fragment>
            </Fragment> :
            <Fragment>
                <Divider horizontal>{groupName}</Divider>
                <Card.Group>
                    {users.map((user) => (
                        <UserCard student={user} />
                    ))}
                </Card.Group>
            </Fragment>
    );
};

export default UsersCardsGroup;
