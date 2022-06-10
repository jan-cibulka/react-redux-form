import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import type { NextPage } from 'next';
import Head from 'next/head';
import { fetchData } from '../features/counter/form/formApi';

const IndexPage: NextPage = (): JSX.Element => {
  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Head>
        <title>Form Website</title>
      </Head>
      <Box
        sx={{ color: 'blue', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', mt: 10, p: 10 }}
      >
        <Box>
          <Typography>Section1</Typography>
        </Box>
        <Box>
          <Button onClick={fetchData}>Fetch</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default IndexPage;
