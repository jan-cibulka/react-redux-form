import { Box, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { Field, reduxForm } from 'redux-form';
import { submitFileInfo } from '../features/counter/form/formApi';
import { SubmitFileInfoSchema } from '../model/schema';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const submit = useCallback(async values => {
    console.log(values);
    const safeValues = SubmitFileInfoSchema.safeParse(values);
    if (safeValues.success) {
      const result = await submitFileInfo(safeValues.data);
      console.log(result);
    } else {
      console.log(safeValues['error']);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box>
        <label>Name</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="Name" />
        </div>
      </Box>
      <Box>
        <label>Height</label>
        <div>
          <Field name="height" component="input" type="number" parse={value => Number(value)} />
        </div>
      </Box>

      <Box sx={{ mt: 5, display: 'flex', gap: 4 }}>
        <Button variant="contained" color="primary" type="submit" disabled={pristine || submitting}>
          Submit
        </Button>
        <Button variant="contained" color="warning" type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </Box>
    </form>
  );
};

export default reduxForm({
  form: 'simple',
  initialValues: { name: 'TestName', height: 123 },
})(SimpleForm);
