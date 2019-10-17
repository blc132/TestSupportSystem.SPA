import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { ICourseFormValues } from '../../app/models/course';


const validate = combineValidators({
    name: isRequired({ message: 'Wymagane' }),
})

const CourseForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { createCourse } = rootStore.courseStore;
    return (
        <FinalForm
            onSubmit={(values: ICourseFormValues) =>
                createCourse(values).catch(error => ({
                    [FORM_ERROR]: error
                }))
            }
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
                        <Header
                            as='h2'
                            content='Dodaj kurs'
                            color='black'
                            textAlign='center'
                        />
                        <Field name='name' component={TextInput} placeholder='Nazwa kursu' />
                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage
                                error={submitError}
                            />
                        )}
                        <Button
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                            loading={submitting}
                            color='teal'
                            content='Dodaj'
                            fluid
                        />
                    </Form>
                )}
        />
    );
};

export default CourseForm;
