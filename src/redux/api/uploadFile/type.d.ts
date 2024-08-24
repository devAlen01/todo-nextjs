namespace UploadFile {
  type UploadRespone = {
    name: string;
    format: string;
    file: string;
    url: string;
  };
  type UploadRequest = FormData;
}
