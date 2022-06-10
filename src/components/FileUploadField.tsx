import { Typography, useTheme, Box } from '@mui/material';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const FileInputField = ({ input: { onChange, onBlur }, meta, ...props }): JSX.Element => {
  const theme = useTheme();
  console.log(meta);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4, height: 100 }}>
      <Typography variant="h6">Pick a file</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <input
          onChange={adaptFileEventToValue(onChange)}
          onBlur={adaptFileEventToValue(onBlur)}
          type="file"
          {...props.input}
          {...props}
        />
        {meta && meta.dirty && <Typography color={theme.palette.error.main}>{meta.error}</Typography>}
      </Box>
    </Box>
  );
};

export default FileInputField;
