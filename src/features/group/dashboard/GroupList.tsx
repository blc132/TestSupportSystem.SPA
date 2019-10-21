import React, { useContext, Fragment } from 'react';
import { Item, Label, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const GroupList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { groups, loadGroups } = rootStore.groupStore;
    loadGroups();

    return (
        <Fragment>
            {groups.map((group) => (
                <Card
                    link
                    header={group.name}
                    meta={group.course.name}
                />
            ))}
        </Fragment>
    );
};

export default observer(GroupList);
