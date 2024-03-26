import { isEmpty } from "lodash";

export default class ResponseError {
  constructor(response = { status: 500 }, customMessage = "") {
    this.response = response;
    this.customMessage = customMessage;
  }

  getError() {
    const { response, customMessage } = this;
    const data = response.data || {
      message: "Erro de conexão",
      code: "0",
      type: "",
    };
    let error;
    let errorMessage;
    let errorParsed;

    try {
      if (data.erros) {
        [error] = data.erros;
      } else if (data.messages) {
        [error] = data.messages;
      } else {
        error = data;
      }

      errorParsed = JSON.parse(error);

      errorMessage =
        errorParsed.message ||
        `Ocorreu um erro ao cadastrar usuário: ${errorParsed.erros[0].defaumacessage}` ||
        "";
    } catch (err) {
      errorMessage = error.messages || error.message || error.error || error;
    }

    const code = data.code || response.status;

    if (error.code === 500) {
      return {
        message: "Erro interno do sistema.",
        code,
        type: data.type,
      };
    }

    if (!isEmpty(customMessage)) {
      return {
        message: customMessage,
        code,
        type: error.type,
      };
    }

    return {
      message: errorMessage,
      code,
      type: error.type,
    };
  }
}
