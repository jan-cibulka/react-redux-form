import { Box, Chip, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '~/src/components/Form';
import Progress from '../components/Progress';
import Table from '../components/Table';
import { useInterval } from '../hooks/useInterval';
import FormService from '../service/FormService';
import { AppState } from '../store/store';

const IndexPage: NextPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.general.status);

  const reloadData = useCallback(async () => {
    await FormService.reloadData(dispatch);
  }, [dispatch]);

  useInterval(reloadData, 10000);

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Head>
        <title>Form Website</title>
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', p: 5 }}>
        <Box>
          <Typography variant="h3">File Upload Form</Typography>
        </Box>
        <Form />
        <Box sx={{ opacity: status === 'working' || status === 'success' ? 1 : 0, width: 1 }}>
          <Progress />
        </Box>
        <Box sx={{ opacity: status === 'success' ? 1 : 0, width: 1, textAlign: 'center' }}>
          <Chip label="success" color="success" />
        </Box>
        <Table />
      </Box>
    </Box>
  );
};

export default IndexPage;
