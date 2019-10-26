import React from 'react';
import { Container, Segment, Header, Image, Grid } from 'semantic-ui-react';
import './HomePage.css';

const HomePage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead-home'>
      <Container text className='container-home'>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column className='column-home'>
              <Image
                size='massive'
                className='img-home'
                src='/assets/home.jpg'
                alt='home'
              />
            </Grid.Column>
            <Grid.Column className='column-home column-home-desc'>
              <Header as='h1' inverted>
                <Image
                  size='medium'
                  src='/assets/logo.png'
                  alt='logo'
                />
                SysEgz
        </Header>
              <Header as='h2' inverted>
                System wspierający testy do nauki programowania online
        </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>


      </Container>
    </Segment>
  );
};

export default HomePage;
