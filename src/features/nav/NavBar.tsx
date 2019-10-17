import React, { useContext } from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/home'>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: 10 }} />
                    SysEgz
        </Menu.Item>
                <Menu.Item name='Kursy' as={NavLink} to='/courses' />
                {user && (
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
                )}
            </Container>
        </Menu>
    );
};

export default observer(NavBar);
