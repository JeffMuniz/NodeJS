import saveAs from "file-saver";
import httpMethod from "src/api/httpMethod.enum";
import httpRequestHandler from "src/api/httpRequestHandler";

import {
  getConverterUrl,
  getAccessToken,
  getClientId,
  getRHUrl,
} from "src/modules/UrlManager/UrlManager";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats, layoutTypes } from "@enums";

export const getPDFDocument = async ({ url, fileName }) => {
  const response = await httpRequestHandler({
    url,
    method: httpMethod.GET,
    responseType: "arraybuffer",
  });
  const file = new Blob([response.data], { type: "application/pdf" });
  saveAs(file, fileName);
};

export const getInvoiceDocument = (
  type,
  groupId,
  userId,
  document,
  receivable,
) => {
  const urlFiles = {
    rps: {
      url: `${getRHUrl()}/relatorios/demonstrativo-faturas/${document.number}`,
      fileName: "RPS.pdf",
    },
    "nota-fiscal": {
      url: `${getRHUrl()}/financeiros/${
        document.number
      }/nota-fiscal?idGrupoEmpresa=${groupId}&idUsuario=${userId}`,
      fileName: "NF.pdf",
    },
    boleto: {
      url: `${getRHUrl()}/recebivel/${
        receivable.id
      }/download?idGrupoEmpresa=${groupId}&idUsuario=${userId}`,
      fileName: "BOLETO.pdf",
    },
  };

  const { url, fileName } = urlFiles[type.toLowerCase()] || {};

  return getPDFDocument({ url, fileName });
};

export const getLayoutFromFile = async file => {
  const url = `${getConverterUrl()}/layout`;
  const body = new FormData();
  body.append("file", file);
  const result = await httpRequestHandler({
    responseType: "text",
    method: httpMethod.POST,
    url,
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};

export const validateAleloTicketFile = async (file, layout, params) => {
  const url = `${getConverterUrl()}/${layout}/validate`;
  const body = new FormData();
  body.append("file", file);
  if (params != null) {
    if (params && params.codigos) {
      body.append("codigos", JSON.stringify(params.codigos));
    }
    if (params && params.dataPedido) {
      body.append(
        "dataPedido",
        DateManager(params.dataPedido).format(dateHourFormats.longDateSlash),
      );
    }
  }
  const result = await httpRequestHandler({
    method: httpMethod.POST,
    url,
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const validateTicketFile = async (file, layout, params) => {
  const url = `${getConverterUrl()}/${layout}/validate`;
  const body = new FormData();
  body.append("file", file);
  if (params && params.codigos) {
    body.append("codigos", JSON.stringify(params.codigos));
    body.append("customerCodes", JSON.stringify(params.codigos));
  }
  if (params && params.dataPedido) {
    body.append(
      "dataPedido",
      DateManager(params.dataPedido).format(dateHourFormats.longDateSlash),
    );
  }
  const result = await httpRequestHandler({
    method: httpMethod.POST,
    url,
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const extractTicketFile = async (file, layout) => {
  const url = `${getConverterUrl()}/${layout}/extract`;
  const body = new FormData();
  body.append("file", file);
  const result = await httpRequestHandler({
    method: httpMethod.POST,
    url,
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export const uploadAleloTicket = async ({ file }, layout) => {
  const convertUrl = `${getConverterUrl()}/${layout}/convert`;
  const body = new FormData();
  body.append("file", file);
  const commonRequest = {
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  };
  await validateTicketFile(file, layout);
  const result = await httpRequestHandler({
    method: httpMethod.POST,
    url: convertUrl,
    responseType: "blob",
    ...commonRequest,
  });
  const zipFile = new Blob([result.data], { type: "application/zip" });
  saveAs(zipFile, "mac.zip");
  return result;
};

export const uploadVBTicketFile = async ({ file, dataPedido }, layout) => {
  const convertUrl = `${getConverterUrl()}/${layout}/convert`;
  const body = new FormData();
  body.append("file", file);
  body.append(
    "dataPedido",
    DateManager(dataPedido).format(dateHourFormats.longDateSlash),
  );
  const commonRequest = {
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  };
  await validateTicketFile(file, layout, { dataPedido });
  const result = await httpRequestHandler({
    method: httpMethod.POST,
    url: convertUrl,
    responseType: "blob",
    ...commonRequest,
  });
  const zipFile = new Blob([result.data], { type: "application/zip" });
  saveAs(zipFile, "mac.zip");
  return result;
};

export const uploadTicketFile = async ({ file, data }, layout) => {
  const convertUrl = `${getConverterUrl()}/${layout}/convert`;
  const body = new FormData();
  body.append("file", file);
  body.append("codigos", JSON.stringify(data));
  const commonRequest = {
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  };
  await validateTicketFile(file, layout, { codigos: data });
  const result = await httpRequestHandler({
    method: httpMethod.POST,
    url: convertUrl,
    responseType: "blob",
    ...commonRequest,
  });
  const zipFile = new Blob([result.data], { type: "application/zip" });
  saveAs(zipFile, "mac.zip");
  return result;
};

export const uploadTicketNewOrder = async (
  file,
  layout,
  params,
  hasClientCodes,
  newOrderData,
) => {
  const convertUrl = `${getConverterUrl()}/${layout}/convert-upload`;
  const body = new FormData();
  body.append("file", file);
  body.append("idGrupoEmpresa", newOrderData.idGroup);
  body.append("idUsuario", newOrderData.idUser);
  if (layout === layoutTypes.VB) {
    body.append(
      "dataPedido",
      DateManager(params.dataPedido).format(dateHourFormats.longDateSlash),
    );
    await validateTicketFile(file, layout, { dataPedido: params.dataPedido });
  } else if (hasClientCodes) {
    body.append("codigos", JSON.stringify(params.codigos));
    await validateTicketFile(file, layout, { codigos: params.codigos });
  } else {
    await validateTicketFile(file, layout);
  }
  const commonRequest = {
    body,
    headers: {
      client_id: getClientId(),
      access_token: getAccessToken(),
      "Content-Type": "multipart/form-data",
    },
  };
  await httpRequestHandler({
    method: httpMethod.POST,
    url: convertUrl,
    responseType: "blob",
    ...commonRequest,
  });
};
