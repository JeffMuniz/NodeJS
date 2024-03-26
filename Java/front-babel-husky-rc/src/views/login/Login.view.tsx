
import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Divider, FormItem, Input, Typography } from '@mac/shared-ui';

import Loader from '@/components/loader/Loader.component';

import {
  ArrowImage,
  BoxTitle,
  Button,
  Col,
  ColFields,
  Column,
  FlexRow,
  FooterTitle,
  ImageStyled,
  Row,
  Subtitle,
  Title
} from './Login.style';
import caldeirao from '../../../public/images/caldeirao.png';
import arrow from '../../../public/images/arrow-left.svg';
import { useStores } from '@/stores';

interface LoginState {
  form: {
    user: string;
    password: string;
  },
  hasError: boolean;
  isLoading: boolean;
}

const { Text } = Typography;
const resetPasswordURL = process.env.RESET_PASSWORD_URL || '';

const Login: FC = () => {

  const history = useHistory();

  const [ state, setState ] = useState<LoginState>({
    form: {
      user: '',
      password: '',
    },
    hasError: false,
    isLoading: false,
  })

  const { user } = useStores();

  const handlerOnClick = async (): Promise<void> => {
    setState(prev => ({
      ...prev,
      hasError: false,
      isLoading: true,
    }));

    try {
      const { form } = state;
      await user.login(form.user, form.password);
    } catch (error) {
      setState(prev => ({
        ...prev,
        hasError: true,
        isLoading: false,
      }));
      console.error(error);
      return;
    }

    history.replace("/aprovacoes");
  };

  const handleFormChange = ({
    name,
    value,
  }: {
    name: "user" | "password";
    value: string;
  }) => setState(prev => ({
    ...prev,
    form: {
      ...prev.form,
      [name]: value,
    },
  }));

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('access');
    user.resetState();
  }, []);

  return (
    <Loader isLoading={ state.isLoading }>
      <Row type="flex">
        <Col span={11}>
          <ImageStyled src={caldeirao} alt="caldeirão" />
        </Col>
        <ColFields span={13}>
          <Column type="flex">
            <FlexRow>
              <BoxTitle>
                <a>
                  <ArrowImage src={arrow} alt="voltar" />
                </a>
                <Title>login</Title>
              </BoxTitle>
              <Subtitle>para backoffice</Subtitle>
            </FlexRow>
            <FlexRow flex={3} justify="center" maxWidth="320px">
              <FormItem label="E-mail">
                <Input
                  placeholder="Digite seu e-mail"
                  value={state.form.user}
                  onChange={({ target }) => handleFormChange({
                    name: "user",
                    value: target.value,
                  })}
                />
              </FormItem>
              <FormItem label="Senha">
                <Input.Password
                  placeholder="Digite sua senha"
                  value={state.form.password}
                  onChange={({ target }) => handleFormChange({
                    name: "password",
                    value: target.value,
                  })}
                />
              </FormItem>
              {state.hasError && (
                <Text type="danger">Usuário e/ou senha incorretos</Text>
              )}
              <Button
                type="primary"
                block
                uppercase
                size="large"
                onClick={handlerOnClick}
                disabled={!state.form.user || !state.form.password}
                loading={state.isLoading}>
                Entrar
              </Button>
              <Button
                type="link"
                block
                size="large"
                href={resetPasswordURL}
                >
                Esqueceu sua senha?
              </Button>
            </FlexRow>
            <FlexRow justify="flex-end">
              <Divider />
              <FooterTitle>mac macefícios e Serviços S.A.</FooterTitle>
              <Text>
                R. Amador Bueno, 474 - Santo Amaro, Bloco i, 2° andar
                <br />
                CEP 04752-901, São Paulo/SP • CNPJ/MF nº 30.798.783/0001-61
              </Text>
            </FlexRow>
          </Column>
        </ColFields>
      </Row>
    </Loader>
  );
};

export default Login;
