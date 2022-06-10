import {
  FetchStoredFilesResponseSchema,
  FetchStoredFilesResponseBody,
  SubmitFileInfoRequestBody,
  SubmitFileInfoResponseBody,
  SubmitFileInfoResponseSchema,
  UploadFileResponseBody,
  UploadFileResponseSchema,
} from '../model/schema';

const apiUrl = 'https://my-app-yikvv.ondigitalocean.app';

export type FetchResultResponse = {
  data: FetchStoredFilesResponseBody;
  result: ApiCallResult;
};

export type SubmitFileInfoResponse = {
  data: SubmitFileInfoResponseBody;
  result: ApiCallResult;
};

export type UploadFileResponse = {
  data: UploadFileResponseBody;
  result: ApiCallResult;
};

export type ApiCallResult = 'success' | 'failure';

export async function fetchStoredFiles(): Promise<FetchResultResponse> {
  try {
    const response = await fetch(`${apiUrl}/data`, {
      method: 'GET',
    });

    const result = await response.json();
    const parsedResult = FetchStoredFilesResponseSchema.safeParse(result);

    if (parsedResult.success) {
      return { data: parsedResult.data.sort(), result: 'success' };
    }
  } catch (error) {
    console.log(error);
  }

  return { data: [], result: 'failure' };
}

export async function submitFileInfo(data: SubmitFileInfoRequestBody): Promise<SubmitFileInfoResponse> {
  try {
    console.log('will submit', data);
    const response = await fetch(`${apiUrl}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const parsedResult = SubmitFileInfoResponseSchema.safeParse(result);

    if (parsedResult.success) {
      return { data: parsedResult.data, result: 'success' };
    }
  } catch (error) {
    console.log(error);
  }

  return { data: {}, result: 'failure' };
}

export async function submitFile(uploadId: string, file: File): Promise<UploadFileResponse> {
  try {
    console.log('will submitfile', uploadId, file);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${apiUrl}/upload/${uploadId}`, {
      method: 'POST',

      body: formData,
    });

    const result = await response.json();
    const parsedResult = UploadFileResponseSchema.safeParse(result);

    if (parsedResult.success) {
      return { data: parsedResult.data, result: 'success' };
    }
  } catch (error) {
    console.log(error);
  }

  return { data: {}, result: 'failure' };
}
