import { Box, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

import Form from '~/src/components/Form';
import Table from '../components/Table';

const IndexPage: NextPage = (): JSX.Element => {
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
