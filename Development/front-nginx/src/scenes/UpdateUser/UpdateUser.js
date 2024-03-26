import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";

import store from "src/redux/configureStore";

import { Routes, WebPaths } from "src/routes/consts";
import { func } from "prop-types";
import { Col, Row } from "react-styled-flexboxgrid";

import { Loading } from "@base";
import { Unauthenticated, TextInput, FormGroup } from "@common";
import {
  If,
  formatPhone,
  toOnlyLetters,
  formatDateToApi,
  toOnlyNumbers,
} from "@utils";

import { setUpdateHierarchy as setUpdateHierarchyAction } from "src/redux/modules/usersRegistry/actions/setUpdateHierarchy";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import FormWrapper from "src/modules/Form/Form";
import FormSchema from "./UpdateUser.schema";

import { ForwardButton, LoadingWrapper } from "./UpdateUser.styles";

const title = "atualização de dados";
const subtitle =
  "Agora, para manter o nosso ambiente seguro, pedimos que você atualize seus dados abaixo. Eles serão utilizados para sua identificação na nossa central de atendimento";

export class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);

    const {
      history: {
        location: { state },
      },
    } = props;

    this.state = {
      initialValues: {
        birthDate: state ? state.birthDate : "",
        phone: state ? state.phone : "",
        mother: state ? state.mother : "",
      },
      loading: false,
    };
  }

  handleUpdateUser = async values => {
    this.setState({ loading: true });
    const { setUpdateHierarchy, showToast } = this.props;
    const { history } = this.props;
    const { phone, mother, birthDate } = values;
    const {
      location: { state },
    } = history;
    const {
      location: { pathname },
    } = store.getState().router;

    this.setState({
      initialValues: {
        birthDate,
        phone,
        mother,
      },
    });

    if (state) {
      const { id, name, cpf, email } = state;
      const formattedMotherValue = toOnlyLetters(mother);
      const formattedBirthDateValue = formatDateToApi(birthDate);
      const formattedPhone = phone ? toOnlyNumbers(phone) : null;

      const isFirstAccess = pathname === "/primeiro-acesso";

      try {
        await setUpdateHierarchy({
          id,
          cpf,
          name,
          email,
          birthDate: formattedBirthDateValue,
          phone: formattedPhone,
          mother: formattedMotherValue,
          idUserLogged: id,
          isValidLogin: true,
          isFirstAccess,
        });

        this.setState({ loading: false });

        if (isFirstAccess) {
          history.push(WebPaths[Routes.LOGIN]);
        } else {
          history.push(WebPaths[Routes.ORDERS_DASHBOARD]);
        }

        showToast({
          id: "update_user_details_success",
          label: "Seus dados foram atualizados com sucesso!",
        });
      } catch (err) {
        this.setState({ loading: false });
        showToast({
          id: "update_user_details_error",
          label: "Ocorreu um erro ao atualizar os dados",
        });
      }
    } else {
      this.setState({ loading: false });
      showToast({
        id: "update_user_details_error",
        label: "Não foi possível concluir sua solicitação",
      });
    }
  };

  render() {
    const { initialValues, loading } = this.state;

    return (
      <FormWrapper
        enableReinitialize
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={this.handleUpdateUser}
        render={props => {
          const {
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            errors,
            values,
            isValid,
          } = props;

          return (
            <Fragment>
              <Unauthenticated
                title={title}
                subtitle={subtitle}
                id="context-update-user"
                isLoading={loading}
              >
                <form onSubmit={handleSubmit}>
                  <If test={loading}>
                    <LoadingWrapper>
                      <Loading loading />
                    </LoadingWrapper>
                  </If>
                  <Row>
                    <Col>
                      <FormGroup
                        fieldId="edit_user_birthDate"
                        label="Data de Nascimento"
                        error={touched.birthDate && errors.birthDate}
                        showSuccess={touched.birthDate && !errors.birthDate}
                      >
                        <TextInput
                          id="birthDate"
                          name="birthDate"
                          isRequired
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.birthDate}
                          maskType="birthDay"
                          maskChar=""
                          placeholder="DD/MM/AAAA"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup
                        fieldId="edit_user_phone"
                        label="Telefone"
                        error={touched.phone && errors.phone}
                        showSuccess={touched.phone && !errors.phone}
                      >
                        <TextInput
                          id="phone"
                          name="phone"
                          isRequired
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={formatPhone(values.phone)}
                          maxLength={15}
                          maskType=""
                          maskChar=""
                          placeholder="(11) 9.8888-1111"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={20}>
                      <FormGroup
                        fieldId="edit_user_mother"
                        label="Nome da Mãe"
                        error={touched.mother && errors.mother}
                        showSuccess={touched.mother && !errors.mother}
                      >
                        <TextInput
                          id="mother"
                          name="mother"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isRequired
                          maxLength={50}
                          value={toOnlyLetters(values.mother)}
                          maskType=""
                          maskChar=""
                          placeholder="Joana de Paula"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row center="xs">
                    <Col>
                      <ForwardButton
                        id="btn_edit_user_submit"
                        value="atualizar"
                        disabled={!isValid}
                        type="submit"
                      />
                    </Col>
                  </Row>
                </form>
              </Unauthenticated>
            </Fragment>
          );
        }}
      />
    );
  }
}

UpdateUser.propTypes = {
  setUpdateHierarchy: func.isRequired,
  showToast: func.isRequired,
};

export const mapStateToProps = ({ usersRegistry: { state } }) => ({
  users: state,
});

const mapDispatchToProps = {
  setUpdateHierarchy: setUpdateHierarchyAction,
  showToast: showToastAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
