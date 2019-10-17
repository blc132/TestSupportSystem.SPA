import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Upss - coś poszło nie tak!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/home' primary>
                    Wróć na stronę główną
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;