import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../store/generalSlice';

const FileUploadField = (props: any): JSX.Element => {
  console.log(props);
  const dispatch = useDispatch();
  const onChange = useCallback(
    (e: any) => {
      const {
        input: { onChange },
      } = props;
      console.log(e);
      const file = e.target.files[0];
      console.log(file);
      dispatch(setSelectedFile(file));
      onChange({ name: file.name, size: file.size });
    },
    [dispatch, props],
  );

  return <input type="file" name="upload" onChange={onChange} />;
};

export default FileUploadField;
