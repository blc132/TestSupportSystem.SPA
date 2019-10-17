import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired, createValidator, composeValidators } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { roles } from '../../app/common/options/roleOptions';
import SelectInput from '../../app/common/form/SelectInput';


const isValidEmail = createValidator(
    (message: any) => (value: string) => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return message
        }
    },
    'Nieprawidłowy e-mail'
)

const isValidPassword = createValidator(
    (message: any) => (value: string) => {
        if (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i.test(value)) {
            return message
        }
    },
    'Minimum 6 znaków, mała litera, duża litera, cyfra, znak specjalny'
)



const validate = combineValidators({
    userName: isRequired({ message: 'Wymagane' }),
    firstName: isRequired({ message: 'Wymagane' }),
    lastName: isRequired({ message: 'Wymagane' }),
    role: isRequired({message: "Wymagane"}),

    password: composeValidators(
        isRequired({ message: 'Wymagane' }),
        isValidPassword,
    )(),

    email: composeValidators(
        isRequired({ message: 'Wymagane' }),
        isValidEmail
    )(),
})



const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) =>
                register(values).catch(error => ({
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
                            content='Zarejestruj się do SysEgz'
                            color='black'
                            textAlign='center'
                        />
                        <Field name='userName' component={TextInput} placeholder='Nick' />
                        <Field
                            name='firstName'
                            component={TextInput}
                            placeholder='Imię'
                        />
                        <Field
                            name='lastName'
                            component={TextInput}
                            placeholder='Nazwisko'
                        />
                        <Field name='email' component={TextInput} placeholder='Email' />
                        <Field
                            name='password'
                            component={TextInput}
                            placeholder='Hasło'
                            type='password'
                        />
                        <Field
                            component={SelectInput}
                            options={roles}
                            name='role'
                            placeholder='Rola'
                        />
                        <Field
                            name='rolePassword'
                            component={TextInput}
                            placeholder='Hasło do roli'
                            type='password'
                        />
                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage
                                error={submitError}
                            />
                        )}
                        <Button
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                            loading={submitting}
                            color='teal'
                            content='Rejestracja'
                            fluid
                        />
                    </Form>
                )}
        />
    );
};

export default RegisterForm;
