import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import { submitFile, submitFileInfo } from '../form/formApi';
import { SubmitFileInfoSchema } from '../model/schema';

import { AppState } from '../store/store';
import CustomField from './Field';
import FileUploadField from './FileUploadField';

const validate = (values: any) => {
  const errors = {};
  console.log('validate', values);
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
  const form = useSelector((state: AppState) => state.form);
  const { handleSubmit, pristine, submitting, reset, valid } = props;
  const submit = useCallback(
    async values => {
      const safeValues = SubmitFileInfoSchema.safeParse(values);
      if (safeValues.success) {
        const { data: fileInfo } = await submitFileInfo(safeValues.data);
        const { data: fileUploadResult } = await submitFile(fileInfo.uploadId, values.upload);
        console.log(fileInfo, fileUploadResult);
        reset();
      } else {
        console.log(safeValues['error']);
      }
    },
    [reset],
  );

  return (
    <Box sx={{ maxWidth: 1, overflow: 'hidden', width: 0.5 }}>
      <Form onSubmit={handleSubmit(submit)}>
        <Field name="name" component={CustomField} type="text" placeholder="Name" />
        <Field
          name="height"
          component={CustomField}
          type="number"
          parse={value => (value ? Number(value) : '')}
          placeholder="Height"
        />

        {/* <Field name="upload" component={FileUploadField} placeholder="Upload" /> */}
        <Field name="upload" component={FileUploadField} type="file" />

        <Box sx={{ mt: 5, display: 'flex', gap: 4 }}>
          <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting || !valid}>
            Submit
          </Button>
        </Box>
        <pre>{JSON.stringify(form, undefined, 2)}</pre>
      </Form>
    </Box>
  );
};

export default reduxForm({
  form: 'main',
  validate,
})(SimpleForm);
