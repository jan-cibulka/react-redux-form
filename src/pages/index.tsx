import { Box, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Form from '~/src/components/Form';
import Table from '../components/Table';
import { useInterval } from '../hooks/useInterval';
import FormService from '../service/FormService';

const IndexPage: NextPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const reloadData = useCallback(async () => {
    await FormService.reloadData(dispatch);
    console.log('tady');
  }, [dispatch]);

  useInterval(reloadData, 10000);

  useEffect(() => {
    console.log('tady2');
    reloadData();
  }, [reloadData]);

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Head>
        <title>Form Website</title>
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', mt: 10, p: 10 }}>
        <Box>
          <Typography variant="h3">File Upload Form</Typography>
        </Box>
        <Form />
        <Table />
      </Box>
    </Box>
  );
};

export default IndexPage;
