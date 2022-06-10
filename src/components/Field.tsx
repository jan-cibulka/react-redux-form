import { Box, Typography, useTheme } from '@mui/material';

const Field = (props: any): JSX.Element => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4, minHeight: 100 }}>
      <Typography variant="h6">{props.placeholder}</Typography>
      <pre>{JSON.stringify(props.meta, undefined, 2)}</pre>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <input {...props.input} placeholder={props.placeholder} type={props.type} />
        {props.meta && props.meta.dirty && <Typography color={theme.palette.error.main}>{props.meta.error}</Typography>}
      </Box>
    </Box>
  );
};

export default Field;
