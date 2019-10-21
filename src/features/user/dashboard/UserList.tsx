import React, { useContext, Fragment } from 'react';
import { Item, Label, Card, Button, Image, Segment, Divider } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const UserList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { users, loadUsers } = rootStore.userStore;
    loadUsers();

    return (
        <Segment>
            <Card>
                <Card.Content>
                    <Card.Header><h1>Użytkownicy</h1></Card.Header>
                </Card.Content>
            </Card>
            <Divider horizontal>Główni prowadzący</Divider>
            <Card.Group>
                {users.filter(function (user) {
                    return user.role == "GlownyProwadzacy";
                }).map((mainlecturer) => (
                    <Card>
                    <Card.Content>
                        <Card.Header>{mainlecturer.email}</Card.Header>
                        <Card.Meta>{mainlecturer.firstName + " " + mainlecturer.lastName}</Card.Meta>
                        <Card.Meta>{mainlecturer.userName}</Card.Meta>
                    </Card.Content>
                </Card>
                ))}
            </Card.Group>
            <Divider horizontal>Prowadzący</Divider>
            <Card.Group>
                {users.filter(function (user) {
                    return user.role == "Prowadzacy";
                }).map((lecturer) => (
                    <Card>
                    <Card.Content>
                        <Card.Header>{lecturer.email}</Card.Header>
                        <Card.Meta>{lecturer.firstName + " " + lecturer.lastName}</Card.Meta>
                        <Card.Meta>{lecturer.userName}</Card.Meta>
                    </Card.Content>
                </Card>
                ))}
            </Card.Group>
            <Divider horizontal>Studenci</Divider>
            <Card.Group>
                {users.filter(function (user) {
                    return user.role == "Student";
                }).map((student) => (
                    <Card>
                    <Card.Content>
                        <Card.Header>{student.email}</Card.Header>
                        <Card.Meta>{student.firstName + " " + student.lastName}</Card.Meta>
                        <Card.Meta>{student.userName}</Card.Meta>
                    </Card.Content>
                </Card>
                ))}
            </Card.Group>
        </Segment>
    );
};

export default observer(UserList);
