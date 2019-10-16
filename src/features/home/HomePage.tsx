import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const HomePage = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          SysEgz
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header as='h2' inverted content={`Witaj z powrotem ${user.username}`} />
            <Button as={Link} to='/courses' size='huge' inverted>
              Kursy!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
          <Header as='h2' inverted content={`Witaj w SysEgz`} />
          <Button size='huge' inverted>
            Logowanie
          </Button>
          <Button size='huge' inverted>
            Rejestracja
          </Button>
        </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
