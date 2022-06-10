import { FetchDataSchema, FileUpload } from '../../../model/FileUploadModel';

const apiUrl = 'https://my-app-yikvv.ondigitalocean.app';

export type FetchResult = {
  data: FileUpload[];
  result: ApiCallResult;
};

export type ApiCallResult = 'success' | 'failure';

export async function fetchData(): Promise<FetchResult> {
  console.log('will fetch');
  const response = await fetch(`${apiUrl}/data`, {
    method: 'GET',
  });

  const result = await response.json();

  const parsedResult = FetchDataSchema.safeParse(result);

  if (parsedResult.success) {
    return { data: parsedResult.data, result: 'success' };
  }

  return { data: [], result: 'failure' };
}
