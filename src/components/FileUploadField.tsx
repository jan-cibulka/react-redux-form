import { Typography, useTheme, Box, Button } from '@mui/material';

import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { formName } from './Form';

const adaptFileEventToValue = delegate => e => {
  delegate(e.target.files[0]);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const FileInputField = ({ input: { onChange, onBlur }, meta, ...props }): JSX.Element => {
  const theme = useTheme();
  const form = useSelector((state: AppState) => state.form[formName]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 6, minHeight: 150 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <label htmlFor="file-input-field">
          <Button variant="outlined" component="span">
            Select a file
          </Button>
        </label>
        <input
          onChange={adaptFileEventToValue(onChange)}
          onBlur={adaptFileEventToValue(onBlur)}
          type="file"
          hidden
          id="file-input-field"
          {...props.input}
          {...props}
        />
        {form.values && form.values['upload'] && (
          <Typography variant="body2">Selected file: {form.values['upload'].name}</Typography>
        )}
        {meta && meta.error && meta.dirty && <Typography color={theme.palette.error.main}>{meta.error}</Typography>}
      </Box>
    </Box>
  );
};

export default FileInputField;
