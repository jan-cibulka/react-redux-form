import { z } from 'zod';

//schemas
const StoredFileSchema = z.object({
  name: z.string(),
  height: z.number(),
  file: z.string(),
});

const FetchStoredFilesResponseSchema = z.array(StoredFileSchema);

const FormValuesSchema = z.object({
  name: z.string(),
  height: z.number(),
  upload: z.any(),
});

const SubmitFileInfoResponseSchema = z.object({
  uploadId: z.string(),
});

const UploadFileResponseSchema = z.object({
  result: z.boolean(),
});

type FormValues = z.infer<typeof FormValuesSchema>;
type StoredFile = z.infer<typeof StoredFileSchema>;

export { SubmitFileInfoResponseSchema, UploadFileResponseSchema, FetchStoredFilesResponseSchema, FormValuesSchema };
export type { StoredFile, FormValues };
