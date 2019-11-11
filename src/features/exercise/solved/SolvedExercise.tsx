import React, { useContext, useEffect, Fragment } from 'react';
import { Segment, Grid, Header, GridColumn } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

interface DetailParams {
    id: string;
}

const SolvedExercise: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { solvedExerciseDetails, loadSolvedExerciseDetails, loadingInitialExercise } = rootStore.exerciseStore;

    useEffect(() => {
        loadSolvedExerciseDetails(match.params.id);
    }, [loadSolvedExerciseDetails, match.params.id, history]);

    if (loadingInitialExercise) return <LoadingComponent content='Ładowanie zadania...' />;

    if (!solvedExerciseDetails) return <h2>Nie znaleziono zadania</h2>;

    return (
        <Fragment>
            <Segment>
                <Header
                    as='h2'
                    content={solvedExerciseDetails.name}
                    color='black'
                    textAlign='center'
                />
                <Grid >
                    <Grid.Row>
                        <Grid.Column width={9}>
                            <Segment>
                                <Header
                                    as='h3'
                                    content={solvedExerciseDetails.course.name}
                                    color='black'
                                    textAlign='center'
                                />
                            </Segment>
                            <Segment>
                                <Header
                                    as='h3'
                                    content={solvedExerciseDetails.content}
                                    color='black'
                                    textAlign='center'
                                />
                            </Segment>
                            <Segment>
                                <Header
                                    as='h3'
                                    content={solvedExerciseDetails.programmingLanguage}
                                    color='black'
                                    textAlign='center'
                                />
                            </Segment>
                            <Segment>
                                <Header
                                    as='h4'
                                    content='Kod'
                                    color='black'
                                    textAlign='center'
                                />
                                <CodeMirror
                                    className="code"
                                    value={solvedExerciseDetails.code}
                                    options={{
                                        mode: 'javascript',
                                        theme: 'material',
                                        lineNumbers: true,
                                        smartIndent: true,
                                        readOnly: true,
                                    }}
                                    onBeforeChange={() => {
                                    }}
                                    onChange={() => {
                                    }}
                                />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            {solvedExerciseDetails.correctnessTestsResults.map(correctnessTestResult => (
                                <Segment>
                                    <Header
                                        as='h4'
                                        content='Test poprawności'
                                        color='black'
                                        textAlign='center'
                                    />

                                    <Grid>
                                        <Grid.Column width={8}>
                                            <Segment>
                                                <Header
                                                    as='h4'
                                                    content='Status'
                                                    color='black'
                                                    textAlign='center'
                                                />
                                                {correctnessTestResult.status === 'Accepted' ?
                                                    <Header
                                                        as='h4'
                                                        content={correctnessTestResult.status}
                                                        color='green'
                                                        textAlign='center'
                                                    /> :
                                                    <Header
                                                        as='h4'
                                                        content={correctnessTestResult.status}
                                                        color='red'
                                                        textAlign='center'
                                                    />}
                                            </Segment>
                                            <Segment>
                                                <Header
                                                    as='h4'
                                                    content='Błędy'
                                                    color='black'
                                                    textAlign='center'
                                                />
                                                <Header
                                                    as='h4'
                                                    content={correctnessTestResult.error}
                                                    color='black'
                                                    textAlign='center'
                                                />
                                            </Segment>
                                        </Grid.Column>

                                        <Grid.Column width={8}>
                                            <Segment>

                                                <Header
                                                    as='h4'
                                                    content='Zużyta pamięć'
                                                    color='black'
                                                    textAlign='center'
                                                />
                                                <Header
                                                    as='h4'
                                                    content={correctnessTestResult.memory + "kb"}
                                                    color='black'
                                                    textAlign='center'
                                                />
                                            </Segment>

                                            <Segment>
                                                <Header
                                                    as='h4'
                                                    content='Czas'
                                                    color='black'
                                                    textAlign='center'
                                                />
                                                <Header
                                                    as='h4'
                                                    content={correctnessTestResult.time + "s"}
                                                    color='black'
                                                    textAlign='center'
                                                />
                                            </Segment>
                                        </Grid.Column>
                                        <Grid.Column width={16}>
                                            <Segment>
                                                <Header
                                                    as='h4'
                                                    content='Informacje kompilacji'
                                                    color='black'
                                                    textAlign='center'
                                                />
                                                <Header
                                                    as='h4'
                                                    content={correctnessTestResult.compileOutput}
                                                    color='black'
                                                    textAlign='center'
                                                />
                                            </Segment>
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

export default observer(SolvedExercise);
