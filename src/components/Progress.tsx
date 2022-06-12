import { Box, LinearProgress, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';

const Progress = (): JSX.Element => {
  const { loaded, total } = useSelector((state: AppState) => state.general.progress);

  const progress = useMemo(() => {
    if (total && loaded) {
      return Math.round((loaded / total) * 100);
    }
    return 0;
  }, [loaded, total]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 1 }}>
      <Box sx={{ mr: 1, width: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
      </Box>
    </Box>
  );
};

export default memo(Progress);
