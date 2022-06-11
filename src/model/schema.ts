import { z } from 'zod';

//schemas
const StoredFileSchema = z.object({
  name: z.string(),
  height: z.number(),
  file: z.string(),
});

const FormValuesSchema = z.object({
  name: z.string(),
  height: z.number(),
  upload: z.any(),
});

const FetchStoredFilesResponseSchema = z.array(StoredFileSchema);

const SubmitFileInfoSchema = z.object({
  name: z.string(),
  height: z.number(),
});

const SubmitFileInfoResponseSchema = z.object({
  uploadId: z.string(),
});

const UploadFileSchema = z.object({
  file: z.any(),
});

const UploadFileResponseSchema = z.object({
  result: z.boolean(),
});

//request body types
type SubmitFileInfoRequestBody = z.infer<typeof SubmitFileInfoSchema>;
type SubmitFileInfoResponseBody = z.infer<typeof SubmitFileInfoResponseSchema>;
type UploadFileRequestBody = z.infer<typeof UploadFileSchema>;
type UploadFileResponseBody = z.infer<typeof UploadFileResponseSchema>;
type FetchStoredFilesResponseBody = z.infer<typeof FetchStoredFilesResponseSchema>;
type FormValues = z.infer<typeof FormValuesSchema>;

// other types
type StoredFile = z.infer<typeof StoredFileSchema>;

export {
  SubmitFileInfoSchema,
  SubmitFileInfoResponseSchema,
  StoredFileSchema,
  UploadFileSchema,
  UploadFileResponseSchema,
  FetchStoredFilesResponseSchema,
  FormValuesSchema,
};
export type {
  SubmitFileInfoRequestBody,
  SubmitFileInfoResponseBody,
  UploadFileRequestBody,
  UploadFileResponseBody,
  FetchStoredFilesResponseBody,
  StoredFile,
  FormValues,
};
