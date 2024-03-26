import saveAs from "file-saver";

const mimeTypes = {
  PDF: "application/pdf",
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const convertBase64toBlob = (
  b64Data,
  contentType = "",
  sliceSize = 512,
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const downloadReportFile = ({ type, content, fileName }) => {
  try {
    const blobFile = convertBase64toBlob(content, mimeTypes[type]);
    const fileURL = URL.createObjectURL(blobFile);
    saveAs(fileURL, fileName);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
