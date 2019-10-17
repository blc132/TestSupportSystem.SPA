import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const LandingPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
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
        <Fragment>
          <Header as='h2' inverted style={{ marginBottom: 50 }}>
            System wspierający testy do nauki programowania online
        </Header>
          <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
            Logowanie
          </Button>
          <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
            Rejestracja
          </Button>
        </Fragment>
      </Container>
    </Segment>
  );
};

export default LandingPage;
