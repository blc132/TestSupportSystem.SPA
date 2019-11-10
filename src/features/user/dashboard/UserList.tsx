import React, { useContext, useEffect, Fragment } from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { ADMINISTRATOR_ROLE, MAINLECTURER_ROLE, LECTURER_ROLE, STUDENT_ROLE } from '../../../app/common/roles/roles';
import UsersCardsGroup from './UsersCardsGroup'

const UserList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { users, loadUsers, loadingInitial, user } = rootStore.userStore;

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    if (loadingInitial) return <LoadingComponent content='Ładowanie użytkowników...' />;
    return (
        <Segment>
            <Divider horizontal><h1>Użytkownicy</h1></Divider>
            {user && user.role === ADMINISTRATOR_ROLE && (
                <Fragment>
                    <UsersCardsGroup users={users.filter(x => x.role === ADMINISTRATOR_ROLE)} groupName="Administratorzy" />
                    <UsersCardsGroup users={users.filter(x => x.role === MAINLECTURER_ROLE)} groupName="Główni prowadzący" />
                    <UsersCardsGroup users={users.filter(x => x.role === LECTURER_ROLE)} groupName="Prowadzący" />
                    <UsersCardsGroup users={users.filter(x => x.role === STUDENT_ROLE)} groupName="Studenci" />
                </Fragment>
            )}
            {user && user.role === MAINLECTURER_ROLE && (
                <Fragment>
                    <UsersCardsGroup users={users.filter(x => x.role === LECTURER_ROLE)} groupName="Prowadzący" />
                    <UsersCardsGroup users={users.filter(x => x.role === STUDENT_ROLE)} groupName="Studenci" />
                </Fragment>
            )}
            {user && user.role === LECTURER_ROLE && (
                <Fragment>
                    <UsersCardsGroup users={users.filter(x => x.role === STUDENT_ROLE)} groupName="Studenci" />
                </Fragment>
            )}
        </Segment>
    );
};
export default observer(UserList);
