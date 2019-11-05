import React, { useContext, Fragment } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import GroupForm from '../../group/GroupForm';
import RegisterUserForm from '../../user/RegisterUserForm';
import { MAINLECTURER_ROLE } from '../../../app/common/roles/roles';
import { IUser } from '../../../app/models/user';

interface IProps {
    user: IUser;
}

const NavBarAdministrator: React.FC<IProps> = ({ user }) => {
    const rootStore = useContext(RootStoreContext);
    const { openModal } = rootStore.modalStore
    if (user.role == MAINLECTURER_ROLE) {
        return (
            <Fragment>
                <Menu.Item >
                    <Dropdown pointing='top left' text="Kursy">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Przeglądaj' icon='list' as={NavLink} exact to='/courses' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item >
                <Menu.Item >
                    <Dropdown pointing='top left' text="Zadania">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Dodaj' icon='plus' as={NavLink} exact to='/exercise/add' />
                            <Dropdown.Item text='Przeglądaj' icon='list' as={NavLink} exact to='/exercises' />
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
            </Fragment>
        )
    } else
        return (<Fragment></Fragment>);
}
export default observer(NavBarAdministrator);
