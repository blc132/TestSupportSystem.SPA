import React, { useContext, Fragment } from 'react';
import { Menu, Container, Dropdown, MenuHeader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import NavBarAdmininstrator from './navroles/NavBarAdministrator'
import NavBarMainLecturer from './navroles/NavBarMainLecturer'
import NavBarLecturer from './navroles/NavBarLecturer'
import NavBarStudent from './navroles/NavBarStudent'

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
                {user && (
                    <Fragment>
                        <NavBarAdmininstrator user={user} />
                        <NavBarMainLecturer user={user} />
                        <NavBarLecturer user={user} />
                        <NavBarStudent user={user} />
                        <Menu.Item position='right'>
                            <MenuHeader>
                                {user.role}
                            </MenuHeader>
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Dropdown pointing='top left' text={user.userName}>
                                <Dropdown.Menu>
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
