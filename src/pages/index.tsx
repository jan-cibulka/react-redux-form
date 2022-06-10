import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';

import Counter from '../features/counter/Counter';
import styles from '../styles/Home.module.css';

const IndexPage: NextPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Counter />
        <Box sx={{ color: 'blue' }}>This is a box</Box>
      </header>
    </div>
  );
};

export default IndexPage;
