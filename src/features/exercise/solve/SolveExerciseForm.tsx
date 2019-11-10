import React, { useContext, useEffect, Fragment } from 'react';
import { Segment, Button, Form, Divider } from 'semantic-ui-react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import './SolveExerciseForm.css'
import { Form as FinalForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { RouteComponentProps } from 'react-router';
import { ISolveExerciseForm } from '../../../app/models/exercise';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

interface SolveExerciseParams {
    id: string;
}

const validate = combineValidators({
    // code: isRequired({ message: 'Wymagane' }),
});

const SolveExerciseForm: React.FC<RouteComponentProps<SolveExerciseParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const { exercise, loadExerciseToSolve, solveExercise, loadingInitialExercise, updateCode, code } = rootStore.exerciseStore;

    useEffect(() => {
        loadExerciseToSolve(match.params.id);
    }, [loadExerciseToSolve, match.params.id, history]);

    if (loadingInitialExercise) return <LoadingComponent content='Ładowanie zadania...' />

    return (
        <Fragment>
            {exercise && (
                <FinalForm
                    onSubmit={(values: ISolveExerciseForm) => {
                        values.id = exercise.id;
                        values.code = code;
                        console.log(values)
                        solveExercise(values).catch(error => ({
                            [FORM_ERROR]: error
                        }))
                    }}
                    validate={validate}
                    render={({
                        handleSubmit,
                        submitting,
                        submitError,
                        invalid,
                        pristine,
                    }) => (
                            <Form onSubmit={handleSubmit} error>
                                <Segment>
                                    <Segment>
                                        <Divider horizontal><h3>{exercise.name}</h3></Divider>
                                        <Divider horizontal><h4>{exercise.course.name}</h4></Divider>
                                        <Divider horizontal><h4>{exercise.programmingLanguage}</h4></Divider>
                                        {exercise.content}
                                    </Segment>
                                    <CodeMirror
                                        className="code"
                                        value={code}
                                        options={{
                                            mode: 'javascript',
                                            theme: 'material',
                                            lineNumbers: true,
                                            smartIndent: true,
                                            readOnly: false,
                                        }}
                                        onBeforeChange={(editor, data, value) => {
                                            updateCode(value);
                                        }}

                                    />
                                    {submitError}
                                    {submitError && (
                                        <ErrorMessage
                                            error={submitError}
                                            text='Błąd!'
                                        />
                                    )}
                                    <div className="send-button-div">
                                        <Button
                                            className='send-button'
                                            loading={submitting}
                                            color='teal'
                                            content='Wyślij'
                                            type='submit'
                                            disabled={invalid}
                                        />
                                    </div>
                                </Segment>
                            </Form>
                        )}
                />
            )}
        </Fragment>
    );
};

export default observer(SolveExerciseForm);