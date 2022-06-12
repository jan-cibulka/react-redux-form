import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoredFile } from '../model/schema';

type Progress = { total: number; loaded: number };
type UploadStatus = 'idle' | 'working' | 'success';
export interface GeneralState {
  storedFiles: StoredFile[];
  progress: Progress;
  status: UploadStatus;
}

const initialState: GeneralState = {
  storedFiles: [],
  progress: { loaded: 0, total: 0 },
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<Progress>) => {
      state.progress = action.payload;
    },
    setStatus: (state, action: PayloadAction<UploadStatus>) => {
      state.status = action.payload;
    },
    setStoredFiles: (state, action: PayloadAction<StoredFile[]>) => {
      state.storedFiles = action.payload;
    },
  },
});

export const { setStoredFiles, setProgress, setStatus } = counterSlice.actions;

export default counterSlice.reducer;
