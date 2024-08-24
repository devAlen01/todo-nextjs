import { api as index } from "..";

export const api = index.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      UploadFile.UploadRespone,
      UploadFile.UploadRequest
    >({
      query: (data) => ({
        url: "/upload/file",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation } = api;
