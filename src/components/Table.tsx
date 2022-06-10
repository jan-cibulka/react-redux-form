import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table as MuiTable } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoredFiles } from '../form/formApi';
import { useInterval } from '../hooks/useInterval';
import { setFetchedData } from '../store/generalSlice';
import { AppState } from '../store/store';

const Table = (): JSX.Element => {
  const data = useSelector((state: AppState) => state.general.fetchedData);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const { data } = await fetchStoredFiles();
    dispatch(setFetchedData(data));
  }, [dispatch]);

  useInterval(fetchData, 10000);

  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Filename</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={row.name + i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.height}</TableCell>
              <TableCell align="right">{row.file}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
