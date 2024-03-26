/* eslint-disable no-underscore-dangle */
import React, { Fragment, PureComponent } from "react";
import { bool } from "prop-types";
import { isEmpty } from "lodash";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats, logsHistory } from "@enums";
import { getHistoryLogs } from "src/api/logsHistory/log";

import {
  LogHistoryContainerStyle,
  UpdateHistoryStyle,
  InactiveHistoryStyle,
} from "./LogHistory.styles";

export class LogHistory extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      logCreate: [],
      logInactive: [],
      logUpdate: [],
      logActive: [],
      uniqueLog: [],
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    const {
      history: { location },
    } = this.props;
    const cpfUser = location && location.state.cpf;
    // eslint-disable-next-line no-underscore-dangle
    if (this._isMounted) {
      await this.searchHistory(cpfUser);
    }
  }

  async componentDidUpdate(prevProps) {
    if (!this._isMounted) {
      return;
    }
    const { userStatus } = this.props;
    if (prevProps.userStatus === userStatus) {
      return;
    }
    const {
      history: { location },
    } = this.props;
    const cpfUser = location && location.state.cpf;
    await this.searchHistory(cpfUser);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({
      logs: null,
      logCreate: null,
      logInactive: null,
      logUpdate: null,
      logActive: null,
      uniqueLog: null,
    });
  }

  isEmptyObj = obj => {
    if (!isEmpty(obj)) {
      return true;
    }
    return false;
  };

  searchHistory = async cpfUser => {
    const result = await getHistoryLogs(cpfUser);
    const { historicos } = result;
    if (historicos.length > 1) {
      this.setState({ logs: historicos, uniqueLog: [] });
      const logInactive = historicos.find(
        log => log.subModulo === "INATIVACAO_USUARIO_PORTAL_RH",
      );
      if (this.isEmptyObj(logInactive)) this.setState({ logInactive });
      const logCreated = historicos.find(
        log => log.subModulo === "CRIACAO_USUARIO",
      );
      if (this.isEmptyObj(logCreated)) this.setState({ logCreate: logCreated });
      const logUpdate = historicos.find(
        log => log.subModulo === "ALTERACAO_USUARIO",
      );
      if (this.isEmptyObj(logUpdate)) this.setState({ logUpdate });
      const logActive = historicos.find(
        log => log.subModulo === "ATIVACAO_USUARIO_PORTAL_RH",
      );
      if (this.isEmptyObj(logActive)) this.setState({ logActive });
    } else {
      const [uniqueLog] = historicos;
      this.setState({ uniqueLog, logs: historicos });
    }
  };

  checkEnumLogs = reason => {
    if (!reason) return;
    let validatedReason;
    Object.entries(logsHistory).forEach(([key, value]) => {
      if (key === reason) {
        validatedReason = value;
      }
    });
    return validatedReason;
  };

  reasonInativateCheck = reason => {
    if (reason === "MUDANCA_AREA") return "Mudança de Área";
    if (reason === "DESLIGAMENTO") return "Desligamento";
    if (reason === "FRAUDE") return "Fraude";
    if (reason === "OBITO") return "Óbito";
    if (reason === "OUTROS") return "Outros";
  };

  actionCheck = action => {
    if (action === "CRIACAO_USUARIO") return "Usuário criado";
    if (action === "ALTERACAO_USUARIO") return "Usuário alterado";
    if (action === "ATIVACAO_USUARIO_PORTAL_RH") return "Usuário ativado";
  };

  formatDateShow = date => {
    const dateFormat = date
      ? DateManager.utc(date).format(dateHourFormats.longDateSlash)
      : "";
    return dateFormat;
  };

  render() {
    const {
      logInactive,
      logCreate,
      logUpdate,
      logActive,
      logs,
      uniqueLog,
    } = this.state;
    const { userStatus } = this.props;

    if (this.isEmptyObj(uniqueLog)) {
      if (
        uniqueLog.subModulo === "INATIVACAO_USUARIO_PORTAL_RH" &&
        !userStatus
      ) {
        return (
          <Fragment>
            <LogHistoryContainerStyle>
              <InactiveHistoryStyle>
                <b>Inativado</b> por motivo{" "}
                <b>{this.reasonInativateCheck(uniqueLog.descricaoSubModulo)}</b>{" "}
                em {this.formatDateShow(uniqueLog.data)} por {uniqueLog.nome}
              </InactiveHistoryStyle>
            </LogHistoryContainerStyle>
          </Fragment>
        );
      }
      return (
        <Fragment>
          <LogHistoryContainerStyle>
            <UpdateHistoryStyle>
              {this.actionCheck(uniqueLog.subModulo)} em{" "}
              {this.formatDateShow(uniqueLog.data)} por <b>{uniqueLog.nome}</b>
            </UpdateHistoryStyle>
          </LogHistoryContainerStyle>
        </Fragment>
      );
    }
    return (
      <Fragment>
        {logs.length ? (
          <LogHistoryContainerStyle>
            {logInactive && !userStatus && (
              <InactiveHistoryStyle>
                <b>Inativado</b> por motivo{" "}
                <b>
                  {this.reasonInativateCheck(logInactive.descricaoSubModulo)}
                </b>{" "}
                em {this.formatDateShow(logInactive.data)} por{" "}
                {logInactive.nome}
              </InactiveHistoryStyle>
            )}
            {logActive && logActive.nome && userStatus && (
              <UpdateHistoryStyle>
                {this.actionCheck(logActive.subModulo)} em{" "}
                {this.formatDateShow(logActive.data)} por{" "}
                <b>{logActive.nome}</b>
              </UpdateHistoryStyle>
            )}
            {logUpdate && logUpdate.nome && (
              <UpdateHistoryStyle>
                {this.actionCheck(logUpdate.subModulo)} em{" "}
                {this.formatDateShow(logUpdate.data)} por{" "}
                <b>{logUpdate.nome}</b>
              </UpdateHistoryStyle>
            )}
            {logCreate && logCreate.nome && (
              <UpdateHistoryStyle>
                {this.actionCheck(logCreate.subModulo)} em{" "}
                {this.formatDateShow(logCreate.data)} por{" "}
                <b>{logCreate.nome}</b>
              </UpdateHistoryStyle>
            )}
          </LogHistoryContainerStyle>
        ) : null}
      </Fragment>
    );
  }
}

LogHistory.propTypes = {
  userStatus: bool.isRequired,
};

export default LogHistory;
