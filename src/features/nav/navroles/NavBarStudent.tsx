import React, { Fragment } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { STUDENT_ROLE } from '../../../app/common/roles/roles';
import { IUser } from '../../../app/models/user';

interface IProps {
    user: IUser;
}

const NavBarStudent: React.FC<IProps> = ({ user }) => {
    if (user.role === STUDENT_ROLE) {
        return (
            <Fragment>
                <Menu.Item >
                    <Dropdown pointing='top left' text="Grupy">
                        <Dropdown.Menu>
                            <Dropdown.Item text='Przeglądaj' icon='list' as={NavLink} exact to='/groups' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Fragment>
        )
    } else
        return (<Fragment></Fragment>);
}
export default observer(NavBarStudent);
