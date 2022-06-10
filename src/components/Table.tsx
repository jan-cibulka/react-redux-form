import { useSelector } from 'react-redux';
import { AppState } from '../app/store';

const Table = (): JSX.Element => {
  const form = useSelector((state: AppState) => state.form);
  return <pre>{JSON.stringify(form, undefined, 2)}</pre>;
};

export default Table;
