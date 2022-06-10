import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { submitFile, submitFileInfo } from '../form/formApi';
import { SubmitFileInfoSchema } from '../model/schema';
import { setUploadId } from '../store/generalSlice';
import { AppState } from '../store/store';
import CustomField from './Field';
import FileUploadField from './FileUploadField';

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
  const uploadId = useSelector((state: AppState) => state.general.uploadId);
  const selectedFile = useSelector((state: AppState) => state.general.selectedFile);
  const dispatch = useDispatch();
  const submit = useCallback(
    async values => {
      const safeValues = SubmitFileInfoSchema.safeParse(values);
      if (safeValues.success) {
        const result1 = await submitFileInfo(safeValues.data);

        dispatch(setUploadId(result1.data.uploadId));

        const result2 = submitFile(result1.data.uploadId, selectedFile);
        console.log(result1, result2);
        reset();
      } else {
        console.log(safeValues['error']);
      }
    },
    [dispatch, reset, selectedFile],
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      {uploadId}

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
    </form>
  );
};

export default reduxForm({
  form: 'main',
  validate,
})(SimpleForm);
