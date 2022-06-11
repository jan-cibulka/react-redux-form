import { Dispatch } from '@reduxjs/toolkit';
import http from '~/src/common/http';
import {
  FetchStoredFilesResponseSchema,
  FormValues,
  SubmitFileInfoResponseSchema,
  UploadFileResponseSchema,
} from '../model/schema';
import { setStoredFiles } from '../store/generalSlice';
class FormService {
  async submitForm(values: FormValues) {
    const uploadId = await this.submitFileInfo(values);
    if (uploadId) {
      this.uploadFile(uploadId, values.upload);
    }
  }
  private async submitFileInfo(values: FormValues) {
    const { data } = await await http.post('/submit', JSON.stringify({ name: values.name, height: values.height }), {
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
  private async uploadFile(uploadId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await http.post(`/upload/${uploadId}`, formData);
    const safeUploadFileResponse = UploadFileResponseSchema.safeParse(data);
    if (safeUploadFileResponse.success) {
      console.log('upload success');
    }
  }
  upload(file, onUploadProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return http.post('/upload', formData, {
      onUploadProgress,
    });
  }
  async reloadData(dispatch: Dispatch<any>) {
    const { data } = await http.get('/data');
    if (data) {
      const safeData = FetchStoredFilesResponseSchema.safeParse(data);
      if (safeData.success) {
        dispatch(setStoredFiles(safeData.data));
      }
    }
  }
}

export default new FormService();
