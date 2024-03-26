import saveAs from "file-saver";
import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";
import { getRedsparkUrl } from "src/modules/UrlManager/UrlManager";

const getBlob = async ({ fileId, fileType }) => {
  const url = `${getRedsparkUrl()}/documentos/${fileId}/downloads`;
  const { data } = await httpRequestHandler({
    url,
    method: httpMethod.GET,
    responseType: "arraybuffer",
  });

  return new Blob([data], {
    type: fileType,
  });
};

export const getDocument = async ({ fileId, fileName, fileType }) => {
  const file = await getBlob({ fileId, fileType });
  saveAs(file, fileName);
};

export const getFileUrl = async ({ fileId, fileType }) => {
  const file = await getBlob({ fileId, fileType });
  return URL.createObjectURL(file);
};
