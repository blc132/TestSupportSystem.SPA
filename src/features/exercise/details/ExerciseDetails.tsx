import React, { useContext, useEffect, Fragment } from 'react';
import { Card, Segment, Divider, Button, Input, Grid, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import './ExerciseDetails.css'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

interface DetailParams {
    id: string;
}

const ExerciseDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { exerciseDetails, loadExerciseDetails, loadingInitialExercise } = rootStore.exerciseStore;
    const { user } = rootStore.userStore;

    useEffect(() => {
        loadExerciseDetails(match.params.id);
    }, [loadExerciseDetails, match.params.id, history]);

    if (loadingInitialExercise) return <LoadingComponent content='Ładowanie zadania...' />;

    if (!exerciseDetails) return <h2>Nie znaleziono zadania</h2>;

    return (
        <Fragment>
            <Segment>
                <Header
                    as='h2'
                    content={exerciseDetails.name}
                    color='black'
                    textAlign='center'
                />
                <Grid columns='equal'>
                    <Grid.Row stretched>
                        <Grid.Column width={9}>
                            <Segment>
                                <Header
                                    as='h4'
                                    content='Treść zadania'
                                    color='black'
                                    textAlign='center'
                                />
                                <Header
                                    as='h3'
                                    content={exerciseDetails.content}
                                    color='black'
                                    textAlign='center'
                                />
                            </Segment>
                            <Segment>
                                <Header
                                    as='h4'
                                    content='Kod początkowy'
                                    color='black'
                                    textAlign='center'
                                />
                                <CodeMirror
                                    className="code"
                                    value={exerciseDetails.initialCode}
                                    options={{
                                        mode: 'javascript',
                                        theme: 'material',
                                        lineNumbers: true,
                                        smartIndent: true,
                                        readOnly: true,
                                    }}
                                    onBeforeChange={(editor, data, value) => {
                                    }}
                                    onChange={() => {
                                    }}
                                />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment>
                                <Header
                                    as='h4'
                                    content='Język programowania'
                                    color='black'
                                    textAlign='center'
                                />
                                <Header
                                    as='h3'
                                    content={exerciseDetails.programmingLanguage}
                                    color='black'
                                    textAlign='center'
                                />
                            </Segment>
                            <Segment>
                                <Header
                                    as='h4'
                                    content='Kurs'
                                    color='black'
                                    textAlign='center'
                                />
                                <Header
                                    as='h3'
                                    content={exerciseDetails.course.name}
                                    color='black'
                                    textAlign='center'
                                />
                            </Segment>
                            {exerciseDetails.correctnessTests.map(correctnessTest => (
                                <Segment>
                                    <Header
                                        as='h4'
                                        content='Test poprawności'
                                        color='black'
                                        textAlign='center'
                                    />

                                    <Grid>
                                        <Grid.Column width={8}>
                                            <Header
                                                as='h4'
                                                content='Input'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Header
                                                as='h4'
                                                content={correctnessTest.inputs.map(input => (input + "\n"))}
                                                color='black'
                                                textAlign='center'
                                            />
                                        </Grid.Column>

                                        <Grid.Column width={8}>
                                            <Header
                                                as='h4'
                                                content='Output'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Header
                                                as='h4'
                                                content={correctnessTest.outputs.map(output => (output + "\n"))}
                                                color='black'
                                                textAlign='center'
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Fragment>
    );
};

export default observer(ExerciseDetails);
