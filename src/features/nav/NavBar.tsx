import React, { useContext, Fragment } from 'react';
import { Menu, Container, Dropdown, MenuHeader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import CourseForm from '../course/CourseForm';
import GroupForm from '../group/GroupForm';
import RegisterUserForm from '../user/RegisterUserForm';
import { ADMINISTRATOR_ROLE, MAINLECTURER_ROLE, LECTURER_ROLE, STUDENT_ROLE } from '../../app/common/roles/roles'

const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;
    const { openModal } = rootStore.modalStore
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/home'>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
                    SysEgz
        </Menu.Item>
                <Menu.Item >
                    <Dropdown pointing='top left' text="Kursy">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Dodaj' icon='plus' onClick={() => openModal(<CourseForm />)} />
                            <Dropdown.Item text='Przeglądaj' icon='list' as={NavLink} exact to='/courses' />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown pointing='top left' text="Zadania">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Dodaj' icon='plus' />
                            <Dropdown.Item text='Przeglądaj' icon='list' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item >
                    <Dropdown pointing='top left' text="Grupy">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Dodaj' icon='plus' onClick={() => openModal(<GroupForm />)} />
                            <Dropdown.Item text='Przeglądaj' icon='list' as={NavLink} exact to='/groups' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item >
                    <Dropdown pointing='top left' text="Użytkownicy">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Dodaj' icon='plus' onClick={() => openModal(<RegisterUserForm />)} />
                            <Dropdown.Item text='Przeglądaj' icon='list' as={NavLink} exact to='/users' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                {user && (
                    <Fragment>
                        <Menu.Item position='right'>
                            <MenuHeader>{user.role}</MenuHeader>
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Dropdown pointing='top left' text={user.userName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as={Link}
                                        to={`/profile/${user.userName}`}
                                        text='Mój profil'
                                        icon='user'
                                    />
                                    <Dropdown.Item onClick={logout} text='Wyloguj' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </Fragment>
                )}
            </Container>
        </Menu>
    );
};

export default observer(NavBar);
