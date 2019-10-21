import React, { useContext, useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { IGroupFormValues } from '../../app/models/group';
import SelectInput from '../../app/common/form/SelectInput';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';


const validate = combineValidators({
    name: isRequired({ message: 'Wymagane' }),
})

const GroupForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadCoursesOptions } = rootStore.courseStore;
    const { createGroup } = rootStore.groupStore;
    const { courseOptions } = rootStore.courseStore;
    loadCoursesOptions();   

    return (
        <FinalForm
            onSubmit={(values: IGroupFormValues) =>
                createGroup(values).catch(error => ({
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
                            content='Dodaj grupe'
                            color='black'
                            textAlign='center'
                        />
                        <Field name='name' component={TextInput} placeholder='Nazwa grupy' />
                        <Field
                            component={SelectInput}
                            options={courseOptions}
                            name='course.id'
                            placeholder='Kursy'
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
                            content='Dodaj'
                            fluid
                        />
                    </Form>
                )}
        />
    );
};

export default observer(GroupForm);
