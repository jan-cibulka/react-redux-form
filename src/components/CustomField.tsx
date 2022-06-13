import { Box, Typography, useTheme, Input } from '@mui/material';

const Field = (props: any): JSX.Element => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4, minHeight: 100 }}>
      <Typography variant="h6">{props.label}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Input {...props.input} placeholder={props.placeholder} type={props.type} data-testid={props.input.name} />
        {props.meta && (props.meta.dirty || props.meta.touched) && (
          <Typography color={theme.palette.error.main}>{props.meta.error}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Field;
