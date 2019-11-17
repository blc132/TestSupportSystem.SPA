import React, { useContext, useEffect, Fragment } from 'react';
import { Segment, Divider, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ADMINISTRATOR_ROLE, MAINLECTURER_ROLE, LECTURER_ROLE } from '../../../app/common/roles/roles';
import { Link } from 'react-router-dom';

interface DetailParams {
    email: string;
}

const UserProfile: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { userDetails, user, loadingInitial, loadUserDetails } = rootStore.userStore;

    useEffect(() => {
        loadUserDetails(match.params.email);
    }, [loadUserDetails, match.params.email, history]);

    if (loadingInitial) return <LoadingComponent content='Ładowanie profilu...' />;

    if (!userDetails) return <h2>Nie znaleziono studenta</h2>;

    return (
        <Fragment>
            <Card>
                <Card.Content>
                    <Card.Header>{userDetails.firstName + " " + userDetails.lastName}</Card.Header>
                    <Card.Meta>{userDetails.email}</Card.Meta>
                    <Card.Meta>{userDetails.userName}</Card.Meta>
                </Card.Content>
            </Card>
            <Segment>
                {userDetails.groups.map(group => (
                    <Fragment>
                        <Divider horizontal>{group.name}</Divider>
                        <Card.Group>
                            {group.exercises.map((exercise) => (
                                <Fragment>
                                    <Card color={exercise.solved ? "green" : "black"}>
                                        <Card.Content>
                                            {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && exercise.solved && (
                                                <Fragment>
                                                    <Card.Header color="black" as={Link} to={`/exercise/solved/${exercise.id}/group/${group.id}/user/${userDetails.id}`}>{exercise.name}</Card.Header>
                                                    <Card.Meta>Rozwiązane</Card.Meta>
                                                </Fragment>
                                            )}
                                            {user && (user.role === ADMINISTRATOR_ROLE || user.role === LECTURER_ROLE || user.role === MAINLECTURER_ROLE) && !exercise.solved && (
                                                <Fragment>
                                                    <Card.Header color="black" as={Link} to={`/exercise/${exercise.id}`}>{exercise.name}</Card.Header>
                                                </Fragment>
                                            )}
                                        </Card.Content>
                                    </Card>
                                </Fragment>
                            ))}
                        </Card.Group>
                    </Fragment>
                ))}
            </Segment>
        </Fragment>


    );
};

export default observer(UserProfile);
