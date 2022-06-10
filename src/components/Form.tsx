import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { reduxForm, Field } from 'redux-form';
import { submitFileInfo } from '../features/counter/form/formApi';
import { SubmitFileInfoSchema } from '../model/schema';
import CustomField from './Field';

const validate = (values: any) => {
  const errors = {};
  console.log(values);
  //name
  if (!values.name) {
    errors['name'] = 'Required';
  } else if (values.name.length < 1) {
    errors['name'] = 'Must be at least one character';
  } else if (values.name.length > 100) {
    errors['name'] = 'Name is too long';
  }

  //height
  if (!values.height) {
    errors['height'] = 'Required';
  } else if (values.height < 0) {
    errors['height'] = 'Must be positive integer.';
  } else if (values.height > 500) {
    errors['height'] = 'Must be 500 or less';
  }

  return errors;
};

const SimpleForm = props => {
  const { handleSubmit, pristine, submitting, reset, valid } = props;

  const submit = useCallback(
    async values => {
      const safeValues = SubmitFileInfoSchema.safeParse(values);
      if (safeValues.success) {
        const result = await submitFileInfo(safeValues.data);
        console.log(result);
        reset();
      } else {
        console.log(safeValues['error']);
      }
    },
    [reset],
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field name="name" component={CustomField} type="text" placeholder="Name" />

      <Field
        name="height"
        component={CustomField}
        type="number"
        parse={value => Number(value) ?? ''}
        placeholder="Height"
      />

      <Box sx={{ mt: 5, display: 'flex', gap: 4 }}>
        <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting || !valid}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default reduxForm({
  form: 'simple',
  validate,
})(SimpleForm);
