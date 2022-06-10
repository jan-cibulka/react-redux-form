import { z } from 'zod';

const FileUploadSchema = z.object({
  name: z.string(),
  height: z.number(),
  file: z.string(),
});

const FetchDataSchema = z.array(FileUploadSchema);

type FileUpload = z.infer<typeof FileUploadSchema>;
type FetchData = z.infer<typeof FetchDataSchema>;

export { FileUploadSchema, FetchDataSchema };
export type { FileUpload, FetchData };
