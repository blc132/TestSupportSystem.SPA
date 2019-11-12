import React, { useContext, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Grid, Segment, Header } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IAddExerciseFormValues2, convertValues } from '../../../app/models/exercise';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { programmingLanguages } from '../../../app/common/options/programmingLanguagesOptions';
import SelectInput from '../../../app/common/form/SelectInput';
import './AddExerciseForm.css'
import { observer } from 'mobx-react-lite';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');


const validate = combineValidators({
    name: isRequired({ message: 'Wymagane' }),
    programmingLanguage: isRequired({ message: 'Wymagane' }),
    content: isRequired({ message: 'Wymagane' }),
    output1: isRequired({ message: 'Wymagane' }),
    input1: isRequired({ message: 'Wymagane' }),
    output2: isRequired({ message: 'Wymagane' }),
    input2: isRequired({ message: 'Wymagane' }),
    output3: isRequired({ message: 'Wymagane' }),
    input3: isRequired({ message: 'Wymagane' }),
    'course.id': isRequired({ message: 'Wymagane' }),

});

const AddExerciseForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadCoursesOptions } = rootStore.courseStore;
    const { createExercise } = rootStore.exerciseStore;
    const { courseOptions } = rootStore.courseStore;
    const [code, updateCode] = useState("");
    loadCoursesOptions();

    const handleUpdateCode = (value: string) => {
        const newCode = value;
        updateCode(newCode);
    }

    return (

        <FinalForm
            onSubmit={(values: IAddExerciseFormValues2) => {
                values.initialCode = code;
                const convertedValues = convertValues(values);
                createExercise(convertedValues).catch(error => ({
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
                dirtySinceLastSubmit
            }) => (
                    <Form onSubmit={handleSubmit} error>
                        <Segment>
                            <Header
                                as='h2'
                                content='Dodaj zadanie'
                                color='black'
                                textAlign='center'
                            />
                            <Grid columns='equal'>
                                <Grid.Row stretched>
                                    <Grid.Column width={9}>
                                        <Segment>
                                            <Header
                                                as='h4'
                                                content='Nazwa'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Field
                                                component={TextInput}
                                                name='name'
                                            />
                                        </Segment>
                                        <Segment>
                                            <Header
                                                as='h4'
                                                content='Treść zadania'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Field name='content' component={TextAreaInput} />
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
                                                value={code}
                                                options={{
                                                    mode: 'javascript',
                                                    theme: 'material',
                                                    lineNumbers: true,
                                                    smartIndent: true,
                                                    readOnly: false,
                                                }}
                                                onBeforeChange={(editor, data, value) => {
                                                    handleUpdateCode(value);
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
                                            <Field
                                                component={SelectInput}
                                                options={programmingLanguages}
                                                name='programmingLanguage'
                                            />
                                        </Segment>
                                        <Segment>
                                            <Header
                                                as='h4'
                                                content='Kurs'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Field
                                                component={SelectInput}
                                                options={courseOptions}
                                                name='course.id'
                                                placeholder='Kurs'
                                            />
                                        </Segment>
                                        <Segment>
                                            <Header
                                                as='h4'
                                                content='Test poprawności 1'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Grid>
                                                <Grid.Column width={8}>
                                                    <Field name='input1' component={TextAreaInput} placeholder='Input (każda linia to kolejny input)' />
                                                </Grid.Column>

                                                <Grid.Column width={8}>
                                                    <Field name='output1' component={TextAreaInput} placeholder='Output (każda linia to kolejny output)' />
                                                </Grid.Column>
                                            </Grid>
                                        </Segment>
                                        <Segment>
                                            <Header
                                                as='h4'
                                                content='Test poprawności 2'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Grid>
                                                <Grid.Column width={8}>
                                                    <Field name='input2' component={TextAreaInput} placeholder='Input (każda linia to kolejny input)' />
                                                </Grid.Column>
                                                <Grid.Column width={8}>
                                                    <Field name='output2' component={TextAreaInput} placeholder='Output (każda linia to kolejny output)' />
                                                </Grid.Column>
                                            </Grid>
                                        </Segment>
                                        <Segment>
                                            <Header
                                                as='h4'
                                                content='Test poprawności 3'
                                                color='black'
                                                textAlign='center'
                                            />
                                            <Grid>
                                                <Grid.Column width={8}>
                                                    <Field name='input3' component={TextAreaInput} placeholder='Input (każda linia to kolejny input)' />
                                                </Grid.Column>
                                                <Grid.Column width={8}>
                                                    <Field name='output3' component={TextAreaInput} placeholder='Output (każda linia to kolejny output)' />
                                                </Grid.Column>
                                            </Grid>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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
                                    disabled={(invalid && !dirtySinceLastSubmit) || submitting}
                                    loading={submitting}
                                    color='teal'
                                    content='Dodaj'
                                />
                            </div>
                        </Segment>
                    </Form>
                )}
        />
    );
}


export default observer(AddExerciseForm);
