import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { IAddUserToGroupFormValues } from '../../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired, composeValidators, createValidator } from 'revalidate';
import ErrorMessage from '../../../app/common/form/ErrorMessage';

const isValidEmail = createValidator(
    (message: any) => (value: string) => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return message
        }
    },
    'Nieprawidłowy e-mail'
)

const validate = combineValidators({
    email: composeValidators(
        isRequired({ message: 'Wymagane' }),
        isValidEmail
    )(),
});

interface IProps {
    groupId: string;
}

const AddUserToGroupForm: React.FC<IProps> = ({ groupId }) => {
    const rootStore = useContext(RootStoreContext);
    const { addUser } = rootStore.groupStore;
    return (
        <FinalForm
            onSubmit={(values: IAddUserToGroupFormValues) => {
                values.groupId = groupId;
                addUser(values).catch(error => ({
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
                        <Field name='email' component={TextInput} placeholder='Email' />
                        {submitError}
                        {submitError && (
                            <ErrorMessage
                                error={submitError}
                                text='Błąd!'
                            />
                        )}
                        <Button
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                            loading={submitting}
                            color='teal'
                            content='Dodaj'
                        />
                    </Form>
                )}
        />
    );
};
export default AddUserToGroupForm;
