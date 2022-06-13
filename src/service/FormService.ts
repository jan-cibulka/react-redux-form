import { Action, Dispatch } from '@reduxjs/toolkit';
import http from '~/src/common/http';
import {
  FetchStoredFilesResponseSchema,
  FormValues,
  SubmitFileInfoResponseSchema,
  UploadFileResponseSchema,
} from '../model/schema';
import { setProgress, setStatus, setStoredFiles } from '../store/generalSlice';
class FormService {
  async submitForm(values: FormValues, dispatch: Dispatch<Action>) {
    dispatch(setStatus('working'));
    const uploadId = await this.submitFileInfo(values);
    if (uploadId) {
      this.uploadFile(uploadId, values.upload, dispatch);
    }
  }
  private async submitFileInfo(values: FormValues) {
    const { data } = await http.post('/submit', JSON.stringify({ name: values.name, height: values.height }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const safeResponseBody = SubmitFileInfoResponseSchema.safeParse(data);
    if (safeResponseBody.success && safeResponseBody.data.uploadId) {
      return safeResponseBody.data.uploadId;
    }
    return null;
  }
  private async uploadFile(uploadId: string, file: File, dispatch: Dispatch<Action>) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await http.post(`/upload/${uploadId}`, formData, {
      onUploadProgress: event => {
        dispatch(setProgress({ loaded: event.loaded, total: event.total }));
      },
    });
    const safeUploadFileResponse = UploadFileResponseSchema.safeParse(data);
    if (safeUploadFileResponse.success) {
      dispatch(setStatus('success'));
      this.reloadData(dispatch);
    }
  }

  async reloadData(dispatch: Dispatch<Action>) {
    const { data } = await http.get('/data');
    console.log('reloading data', data);
    if (data) {
      const safeData = FetchStoredFilesResponseSchema.safeParse(data);
      if (safeData.success) {
        dispatch(setStoredFiles(safeData.data.sort((a, b) => a.name.localeCompare(b.name))));
      }
    }
  }
}

export default new FormService();
