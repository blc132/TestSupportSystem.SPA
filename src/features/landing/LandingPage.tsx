import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image, Icon, Grid, Divider } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import './LandingPage.css';

const LandingPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <Segment inverted textAlign='center' vertical className='masthead-landing'>
      <Container text>
        <Header as='h1' inverted>
          <Icon.Group size='small'>
            <Icon name='code' />
          </Icon.Group>
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
        <Divider className='footer-divider' />
        <Fragment>
          <a title='Skontaktuj się z twórcą' target="_blank" rel="noopener noreferrer" href="https://www.kobrynsky.net">
            <Icon inverted size='huge' name='user circle' />
          </a>
        </Fragment>
      </Container>
    </Segment >

  );
};

export default LandingPage;
