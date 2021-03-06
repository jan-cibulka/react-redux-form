import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table as MuiTable } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';

const Table = (): JSX.Element => {
  const data = useSelector((state: AppState) => state.general.storedFiles);
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
