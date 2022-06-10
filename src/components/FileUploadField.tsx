import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../store/generalSlice';
import theme from '../theme/theme';

const FileUploadField = (props: any): JSX.Element => {
  console.log(props);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e: any) => {
      const {
        input: { onChange },
      } = props;

      const file = e.target.files[0];
      if (file) {
        dispatch(setSelectedFile(file));
        onChange({ name: file.name, size: file.size });
      }
    },
    [dispatch, props],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4, height: 100 }}>
      <Typography variant="h6">{props.placeholder}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <input type="file" name="upload" onChange={onChange} />
        {props.meta && props.meta.dirty && props.meta.touched && (
          <Typography color={theme.palette.error.main}>{props.meta.error}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default FileUploadField;
