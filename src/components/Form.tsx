import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
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
    errors['height'] = 'Must be positive integer.';
  } else if (values.height > 500) {
    errors['height'] = 'Must be 500 or less';
  }

  //file
  if (!values.upload) {
    errors['upload'] = 'Required';
  }

  return errors;
};

const SimpleForm = props => {
  const form = useSelector((state: AppState) => state.form);
  const { handleSubmit, pristine, submitting, reset, valid } = props;
  const selectedFile = useSelector((state: AppState) => state.general.selectedFile);
  const submit = useCallback(
    async values => {
      const safeValues = SubmitFileInfoSchema.safeParse(values);
      if (safeValues.success) {
        const { data: fileInfo } = await submitFileInfo(safeValues.data);
        const { data: fileUploadResult } = await submitFile(fileInfo.uploadId, selectedFile);
        console.log(fileInfo, fileUploadResult);
        reset();
      } else {
        console.log(safeValues['error']);
      }
    },
    [reset, selectedFile],
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

      <Field name="upload" component={FileUploadField} placeholder="Upload" />
      <Box sx={{ mt: 5, display: 'flex', gap: 4 }}>
        <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting || !valid}>
          Submit
        </Button>
      </Box>
      <pre>{JSON.stringify(form, undefined, 2)}</pre>
    </form>
  );
};

export default reduxForm({
  form: 'main',
  validate,
})(SimpleForm);
