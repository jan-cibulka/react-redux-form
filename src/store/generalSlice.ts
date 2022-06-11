import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoredFile } from '../model/schema';

export interface GeneralState {
  uploadId?: string;
  storedFiles: StoredFile[];
  selectedFile?: File;
}

const initialState: GeneralState = {
  uploadId: 'default',
  storedFiles: [],
  selectedFile: undefined,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUploadId: (state, action: PayloadAction<string>) => {
      state.uploadId = action.payload;
    },
    setStoredFiles: (state, action: PayloadAction<StoredFile[]>) => {
      state.storedFiles = action.payload;
    },
    setSelectedFile: (state, action: PayloadAction<File>) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setUploadId, setStoredFiles, setSelectedFile } = counterSlice.actions;

export default counterSlice.reducer;
