import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoredFile } from '../model/schema';

export interface GeneralState {
  uploadId?: string;
  fetchedData: StoredFile[];
  selectedFile?: File;
}

const initialState: GeneralState = {
  uploadId: 'default',
  fetchedData: [],
  selectedFile: undefined,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUploadId: (state, action: PayloadAction<string>) => {
      state.uploadId = action.payload;
    },
    setFetchedData: (state, action: PayloadAction<StoredFile[]>) => {
      state.fetchedData = action.payload;
    },
    setSelectedFile: (state, action: PayloadAction<File>) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setUploadId, setFetchedData, setSelectedFile } = counterSlice.actions;

export default counterSlice.reducer;
