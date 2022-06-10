import { Box, Button, Table, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { fetchData } from '../features/counter/form/formApi';

const IndexPage: NextPage = (): JSX.Element => {
  const [data, setData] = useState([]);

  const handleFetchClick = useCallback(async () => {
    const { data, result } = await fetchData();

    setData(data);
    console.log(data, result);
  }, []);

  return (
    <Box sx={{ width: 1, height: 1 }}>
      <Head>
        <title>Form Website</title>
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', mt: 10, p: 10 }}>
        <Box>
          <Typography variant="h3">File Upload Form</Typography>
        </Box>
        <Box>
          <Button onClick={handleFetchClick} variant="contained">
            Fetch
          </Button>
        </Box>
        <Box>{JSON.stringify(data)}</Box>
        <Table />
      </Box>
    </Box>
  );
};

export default IndexPage;
