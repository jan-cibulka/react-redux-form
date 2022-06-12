import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import { FormValuesSchema } from '../model/schema';
import FormService from '../service/FormService';

import CustomField from './CustomField';
import FileUploadField from './FileUploadField';

export const formName = 'main';

const validate = (values: any) => {
  const errors = {};

  //name
  if (!values.name) {
    errors['name'] = 'Required';
  } else if (values.name.length < 1) {
    errors['name'] = 'Must be at least one character';
  } else if (values.name.length > 100) {
    errors['name'] = 'Name is too long';
  }

  //height
  if (!values.height && values.height != 0) {
    errors['height'] = 'Required';
  } else if (values.height < 0) {
    errors['height'] = 'Must be positive integer';
  } else if (values.height > 500) {
    errors['height'] = 'Must be 500 or less';
  }

  //file
  if (!values.upload) {
    errors['upload'] = 'Required';
  } else if (values.upload.size > 10 * 1024 * 1024) {
    errors['upload'] = 'File is too large';
  }

  return errors;
};

const SimpleForm = props => {
  const { handleSubmit, pristine, submitting, reset, valid } = props;
  const dispatch = useDispatch();
  const submit = useCallback(
    async values => {
      const safeValues = FormValuesSchema.safeParse(values);
      if (safeValues.success) {
        FormService.submitForm(safeValues.data, dispatch);
        reset();
      }
    },
    [reset, dispatch],
  );

  return (
    <Box sx={{ maxWidth: 1, overflow: 'hidden', width: 0.5 }}>
      <Form onSubmit={handleSubmit(submit)}>
        <Field name="name" component={CustomField} type="text" label="Name" placeholder="Name" />
        <Field
          name="height"
          component={CustomField}
          type="number"
          parse={value => (value ? Number(value) : '')}
          placeholder="Height"
          label="Height"
        />
        <Field name="upload" component={FileUploadField} type="file" />
        <Box sx={{ mt: 5, display: 'flex', gap: 4, justifyContent: 'center' }}>
          <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting || !valid}>
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default reduxForm({
  form: formName,
  validate,
})(SimpleForm);
