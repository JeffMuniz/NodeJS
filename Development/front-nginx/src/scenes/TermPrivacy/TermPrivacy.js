/* eslint-disable no-irregular-whitespace */
import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { Routes, WebPaths } from "src/routes/consts";
import { func, bool, shape } from "prop-types";
import { get } from "lodash";

import store from "src/redux/configureStore";
import { OpenModal as openModalAction } from "src/redux/modules/modal/actions/modal";
import {
  getUserStatusInfo as getUserStatusAction,
  postUserStatusTermInfo as postUserStatusTermInfoAction,
} from "src/redux/modules/user/actions/getUserStatus";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import ScrollToTop from "src/common/Template/ScrollToTop/ScrollToTop";

import { NewModal, Loading } from "@base";
import { Unauthenticated, Loading as Load } from "@common";
import { requestStatus as Status, serviceChannelId } from "@enums";
import { If } from "@utils";

import {
  StyledParagraph,
  StyledSubParagraph,
  LoadingWrapper,
} from "./TermPrivacy.styles";

const subtitle =
  "Leia o termo abaixo para aceitar e continuar com seu portal RH";

export class TermPrivacy extends PureComponent {
  constructor(props) {
    super(props);

    const {
      location: { pathname },
    } = store.getState().router;

    this.state = {
      buttonEnabled: false,
      data: {},
      title:
        pathname === "/primeiro-acesso"
          ? "olá! essa informação é importante pra você"
          : "olá! atualizamos nossa política de privacidade",
    };
  }

  async componentDidMount() {
    const {
      location: { search },
    } = store.getState().router;
    const {
      getUserStatusInfo,
      history: {
        location: { data },
      },
      showToast,
    } = this.props;

    const cpfUser = data ? data.cpf : "";
    let result = "";

    try {
      if (search) {
        result = await getUserStatusInfo(search, "");
      } else if (cpfUser) {
        result = await getUserStatusInfo("", cpfUser);
      }

      this.onResultState(result);

      return result;
    } catch (error) {
      showToast({
        id: "error_toast_message_get_user_info_term",
        label: "Ocorreu um erro!",
      });
    }
  }

  onResultState = async result => {
    this.setState({ data: result });
  };

  onClickButtonOkHandler = async () => {
    this.setState({ buttonEnabled: false });

    this.handleSubmit();
  };

  onContentBottomReachHandler = () => this.setState({ buttonEnabled: true });

  handleSubmit = async () => {
    const { history, location, postUserStatusTermInfo, showToast } = this.props;
    const { data } = this.state;
    const {
      location: { pathname },
    } = store.getState().router;

    this.setState({ loading: true });

    const { cpf, status, anonimizado, birthDate, phone, mother } = data;

    const isFirstAccess = pathname === "/primeiro-acesso";

    try {
      await postUserStatusTermInfo(
        cpf,
        serviceChannelId.RH,
        status,
        anonimizado,
        birthDate,
        phone,
        mother,
        isFirstAccess,
      );

      this.setState({ loading: false });

      if (birthDate && phone && mother) {
        const route = get(
          location,
          "state.from",
          WebPaths[Routes.ORDERS_DASHBOARD],
        );

        history.push(route);
      } else {
        history.push(WebPaths[Routes.UPDATE_USER], data);
      }
    } catch (error) {
      this.setState({ loading: false });

      showToast({
        id: "error_toast_message_update_user_term",
        label: "Ocorreu um erro!",
      });
    }
  };

  render() {
    const { buttonEnabled, loading, title } = this.state;

    const {
      closeModal,
      isView,
      goHome,
      chargeBackTerms,
      history: { goBack },
      statusChargeBack: { requestStatus },
    } = this.props;

    return (
      <Fragment>
        <ScrollToTop>
          <Unauthenticated
            showBoxes
            title={title}
            subtitle={subtitle}
            goBack={goHome}
            id="context-term-privacy"
          >
            <If test={requestStatus === Status.loading || loading}>
              <LoadingWrapper>
                <Loading loading />
              </LoadingWrapper>
            </If>
            <NewModal
              id="modal-term-privacy"
              isView={isView}
              width="680px"
              maxHeight="630px"
              padding="5px 40px 48px 40px"
              contentHasScroll
              onContentBottomReach={this.onContentBottomReachHandler}
              okButtonProps={{
                value: "LI E ACEITO O TERMO",
                disabled: !buttonEnabled,
                onClick: this.onClickButtonOkHandler,
                id: "btn_accept_term_privacy",
                popupText: !buttonEnabled
                  ? "<p id='tooltip_read_terms' style='text-transform: initial'>Você precisa ler o termo antes de continuar.</p>"
                  : null,
              }}
              cancelButtonProps={{
                onClick: goBack,
                value: "Cancelar",
                id: "btn_cancel_term_privacy",
              }}
              viewButtonProps={{
                onClick: closeModal,
                value: "FECHAR",
                id: "btn_cancel_term_privacy",
              }}
            >
              <If test={chargeBackTerms.requestStatus === Status.loading}>
                <Load />
              </If>
              <div>
                <StyledParagraph>
                  <b>1. SOBRE ESTES TERMOS E CONDIÇÕES.</b> Os Termos e
                  Condições a seguir &quot;Termos&quot; regulam a utilização do{" "}
                  <b>&quot;PORTAL RH - MachiCard&quot; </b>
                  pelas Empresas que contrataram a prestação do serviço de
                  emissão e gestão dos Cartões mac (Cartão mac Refeição e/ou
                  Cartão mac Alimentação) e disponilização de macefícios nos
                  Cartões mac.
                </StyledParagraph>

                <StyledParagraph>
                  1.1. A Empresa utilizará os serviços disponíveis no{" "}
                  <b>PORTAL RH - MachiCard</b> por meio do Usuário Principal
                  indicado pela Empresa. A Empresa declara, desde já, que o
                  Usuário Principal possui poderes para, de forma isolada,
                  praticar todos os atos que sejam necessários para a execução
                  do objeto do Contrato de Prestação de Serviço de Emissão e
                  Gestão dos Cartões mac, incluindo solicitar a disponibilização
                  de macefícios, solicitar novos Cartões mac e reemissões,
                  atualizar o local de entrega dos Cartões mac, autorizar
                  pagamentos, consultar todas as informações relacionadas aos
                  Cartões mac emitidos e indicar Usuários Secundários, que
                  poderão realizar determinadas operações, conforme a indicação
                  do Usuário Principal.
                </StyledParagraph>

                <StyledParagraph>
                  1.2. Se a Empresa estiver de acordo e quiser utilizar o{" "}
                  <b>PORTAL RH - MachiCard</b>, deverá manifestar a
                  confirmação de que concorda com todas as regras de uso aqui
                  informadas.
                </StyledParagraph>

                <StyledParagraph>
                  1.3. A operadora de telefonia da Empresa e outros serviços de
                  terceiros, como aplicativos ou sites, podem ter seus próprios
                  termos e condições, incluindo políticas de privacidade, aos
                  quais a Empresa também pode estar sujeita.
                </StyledParagraph>

                <StyledParagraph>
                  1.4. Estes Termos estão disponíveis para consulta a qualquer
                  tempo no
                  <b>PORTAL RH - MachiCard.</b>
                </StyledParagraph>

                <StyledParagraph>
                  1.5. A <b>mac </b>reserva-se o direito de revisar estes Termos
                  a qualquer momento e a modifica-los, total ou parcialmente, em
                  virtude de alterações na legislação ou nos serviços, em
                  decorrência da utilização de novas ferramentas tecnológicas
                  ou, ainda, sempre que, a exclusivo critério da <b>mac </b>,
                  tais alterações forem necessárias. Eventuais alterações a
                  estes Termos serão previamente comunicadas à Empresa e a nova
                  versão será disponibilizada com antecedência​. Caso a Empresa
                  não concorde com quaisquer alterações feitas a estes Termos,
                  poderá deixar de usar o PORTAL RH - MachiCard.
                </StyledParagraph>

                <StyledParagraph>
                  <b>2. UTILIZAÇÃO DO PORTAL RH - MachiCard.</b> Ao aderir a
                  estes Termos, a <b>mac </b> disponibilizará à Empresa no
                  <b>&quot;PORTAL RH - MachiCard&quot; </b>
                  funcionalidades que permitirão ao Usuário Master e/ou aos
                  Usuários Secundários o acesso às informações dos Cartões mac
                  emitidos, tais como extratos de disponibilização do macefício,
                  bem como que realize operações em nome da Empresa, de acordo
                  com a modalidade de Cartão mac contratada.
                </StyledParagraph>

                <StyledParagraph>
                  2.1. As informações relacionadas aos Cartões mac são
                  confidenciais e devem ser utilizadas exclusivamente com
                  finalidade de apurar ou demonstrar o descumprimento, pelos
                  portadores dos Cartões mac, de obrigação contratual ou da
                  legislação vigente, incluindo as normas trabalhistas e as
                  regras do Programa de Apoio ao Trabalhador (PAT), de tal modo
                  que, em razão deste dever de confidencialidade, estas
                  informações não poderão ser divulgadas, reproduzidas ou
                  reveladas, direta ou indiretamente, no todo ou em parte, para
                  quaisquer pessoas que não tenham a necessidade de conhecê-las
                  para atingir a finalidade aqui mencionada.
                </StyledParagraph>

                <StyledParagraph>
                  2.2. Por serem canais de conveniência, os serviços disponíveis
                  no
                  <b> PORTAL RH - MachiCard</b> poderão ser ampliados,
                  reduzidos, alterados ou extintos pela mac a qualquer tempo,
                  sem que isso implique necessariamente em alterações a estes
                  Termos.
                </StyledParagraph>

                <StyledParagraph>
                  remoteShellVulner A <b>mac </b>poderá interromper e/ou modificar o
                  funcionamento dos serviços e funcionalidades do{" "}
                  <b>PORTAL RH - MachiCard</b>  para manutenção técnica,
                  atualização e otimização ou em virtude de determinação
                  judicial ou de órgãos reguladores.
                </StyledParagraph>

                <StyledParagraph>
                  2.4. <b>ATENÇÃO: </b>As contratações e operações efetuadas por
                  meios eletrônicos podem ser vulneráveis à ação de terceiros. A
                  Empresa deve assegurar que o Usuário Principal e os Usuários
                  Secundários utilizem equipamentos com sistemas de segurança
                  atualizados.
                </StyledParagraph>

                <StyledParagraph>
                  2.5. Todas as operações de pagamento solicitadas pelo Usuário
                  Principal e/ou pelos Usuários Secundários, via{" "}
                  <b>PORTAL RH - MachiCard </b>
                  são de inteira responsabilidade da Empresa e serão efetivadas
                  mediante débito nas contas correntes cadastradas.
                </StyledParagraph>

                <StyledParagraph>
                  <b>3. USO NÃO AUTORIZADO.</b> O acesso ao 
                  <b>PORTAL RH - MachiCard</b> é restrito, mediante a
                  digitação da senha cadastrada. As senhas dos Cartões mac
                  reconhecem e autenticam a identidade do Usuário Principal e
                  dos Usuários Secundários perante o{" "}
                  <b>PORTAL RH - MachiCard.</b>
                </StyledParagraph>

                <StyledParagraph>
                  3.1. As senhas dos Cartões mac são de uso pessoal,
                  confidencial e intransferível. O Usuário Principal e os
                  Usuários Secundários são responsáveis por conservar o sigilo e
                  a confidencialidade das suas senhas e dos seus dados de
                  identificação do <b>PORTAL RH - MachiCard.</b>
                  Esses dados precisam ser mantidos em segredo, memorizados e
                  nunca anotados.
                </StyledParagraph>

                <StyledParagraph>
                  3.2. O dispositivo ou equipamento utilizado para acesso ao{" "}
                  <b>PORTAL RH - MachiCard.</b> é de inteira
                  responsabilidade da Empresa, camacdo-lhe manter o
                  dispositivo ou equipamento seguro com o uso de ferramentas
                  disponíveis como antivírus e firewall, entre outras,
                  atualizadas, de modo a contribuir na prevenção de riscos
                  eletrônicos.
                </StyledParagraph>

                <StyledSubParagraph>
                  3.2.1. A <b>mac</b> se exime de quaisquer responsabilidades
                  por eventual perda, deterioração, furto, extravio ou quebra do
                  dispositivo.
                </StyledSubParagraph>

                <StyledParagraph>
                  3.3. A mac também está isenta de responsabilidade no caso de o
                  <b> PORTAL RH - MachiCard</b>  permanecer fora do ar ou na
                  ocorrência de falhas no sistema, no servidor ou na conexão com
                  a internet, inclusive por ações de softwares maliciosos, como
                  vírus, cavalos de tróia e outros que possam, de algum modo,
                  danificar o dispositivo ou equipamento ou a sua conexão, em
                  decorrência do acesso, da utilização ou da navegação no
                  <b>PORTAL RH - MachiCard.</b> 
                </StyledParagraph>

                <StyledParagraph>
                  3.4. Se o Usuário Principal ou os Usuários Secundários
                  desconfiarem que a sua senha, utilizada para acessar o PORTAL
                  RH - MachiCard, foi descoberta ou está em risco, deverá
                  alterar seus dados pessoais de segurança e suas credenciais
                  para evitar qualquer utilização indevida do PORTAL RH - mac
                  Visa Card ou das suas informações pessoais e, se o caso,
                  comunicar imediatamente a mac nos canais disponíveis, para
                  bloquear o seu acesso ao <b>PORTAL RH - MachiCard.</b> 
                </StyledParagraph>

                <StyledParagraph>
                  3.5. Por segurança e proteção dos dados da Empresa, a Empresa,
                  o Usuário Principal e os Usuários Secundários têm o dever de
                  cooperar conosco, adotando todas as medidas e procedimentos de
                  prevenção a fraudes que lhe forem indicados pela mac e, ainda,
                  se comprometendo a não desativar qualquer um desses recursos
                  de segurança.
                </StyledParagraph>

                <StyledParagraph>
                  3.6. O Usuário Principal e os Usuários Secundários nunca devem
                  compartilhar suas senhas de acesso ao{" "}
                  <b>PORTAL RH - MachiCard </b>
                  ou seus dados de identificação. Compartilhando essas
                  informações, outras pessoas poderão ter acesso às informações
                  da Empresa ou até mesmo solicitar serviços, sendo que a
                  execução desses serviços será considerada autorizada pela
                  Empresa.
                </StyledParagraph>

                <StyledParagraph>
                  3.7. Em caso de indícios de violação destes Termos e/ou de
                  qualquer legislação ou regulamentação aplicável, a mac poderá
                  adotar as providências pertinentes, ficando autorizada ainda
                  a, mediante aviso prévio, suspender, por tempo indeterminado,
                  o acesso ao
                  <b> PORTAL RH - MachiCard.</b>
                </StyledParagraph>

                <StyledParagraph>
                  3.8. A <b>mac</b> poderá também realizar o bloqueio preventivo
                  e temporário do acesso ao <b>PORTAL RH - MachiCard</b> ou,
                  ainda, a funcionalidades específicas sempre que houver
                  suspeita de alguma ocorrência que possa comprometer a
                  segurança dos serviços e funcionalidades disponíveis. O acesso
                  poderá ser reestabelecido tão logo regularizado o motivo que
                  ocasionou o bloqueio.
                </StyledParagraph>

                <StyledParagraph>
                  3.9. A <b>mac</b> não se responsabiliza por qualquer uso
                  indevido do PORTAL RH - MachiCard pelo Usuário Principal,
                  pelos Usuários Secundários ou por terceiros que o façam com a
                  utilização dos códigos e senhas do Usuário Principal ou dos
                  Usuários Secundários.
                </StyledParagraph>

                <StyledParagraph>
                  3.10. A Empresa e/ou o Usuário Principal deverão comunicar
                  imediatamente à mac a constatação de quaisquer serviços ou
                  funcionalidades do
                  <b> PORTAL RH - MachiCard</b> que possam ter sido
                  utilizados por terceiros.
                </StyledParagraph>

                <StyledParagraph>
                  <b>4. RESPONSABILIDADES.</b> A partir da adesão a estes
                  Termos, a Empresa declara estar ciente de que: (a) a
                  utilização de todos os serviços e funcionalidades do{" "}
                  <b> PORTAL RH - MachiCard</b> são de sua inteira
                  responsabilidade;(b) a mac está isenta de responsabilidade
                  pelo uso indevido do 
                  <b> PORTAL RH - MachiCard</b>, bem como pela utilização em
                  desacordo com os critérios estabelecidos nestes Termos; (c) a 
                  <b>mac</b> se exime de qualquer responsabilidade decorrente de
                  prejuízos ocasionados por casos fortuitos ou de força maior e,
                  ainda, pela utilização por terceiros do 
                  <b> PORTAL RH - MachiCard</b> para a prática de atos
                  ilícitos, ou, ainda, com o objetivo de causar danos a
                  terceiros; (d) a 
                  <b>mac </b>
                  utiliza moderna tecnologia para proporcionar navegação
                  ininterrupta e livre de falhas; porém, como em qualquer
                  ambiente da internet, o 
                  <b>PORTAL RH - MachiCard</b> estão sujeitos a períodos em
                  que o acesso pode se tornar mais lento ou intermitente. Em
                  nenhuma hipótese, por ser da natureza dos serviços virtuais,
                  interrupções de comunicação caracterizarão descumprimento
                  pela mac destes Termos.
                </StyledParagraph>

                <StyledParagraph>
                  4.1. A Empresa se compromete a assegurar que o Usuário
                  Principal e os Usuários Secundários utilizem o 
                  <b>PORTAL RH - MachiCard</b> de acordo com esses Termos,
                  sendo que todos os materiais, sistemas, software, marcas,
                  tecnologias, nomes, desenhos e programas utilizados pela 
                  <b>mac</b>, com exceção daqueles expressamente identificados
                  como de domínio público, são protegidos por direitos autorais.
                  A Empresa se obriga, ainda, a não reproduzir, alterar,
                  combinar, modificar, copiar, licenciar, ceder, sublocar,
                  emprestar ou vender quaisquer materiais relativos ao{" "}
                  <b>PORTAL RH - MachiCard</b>
                </StyledParagraph>

                <StyledParagraph>
                  <b>5. COMUNICAÇÃO.</b> Ao concordar com estes Termos a Empresa
                  declara ter conhecimento e aceita que a mac poderá realizar
                  quaisquer comunicações relacionadas com estes Termos e
                  realizar a oferta de produtos e serviços por meio dos canais
                  de comunicação disponibilizados, inclusive, por e-mail e/ou
                  mensagens/notificações eletrônicas automáticas em dispositivos
                  móveis (tais como SMS, MMS ou PUSH). Também por essa razão, a
                  Empresa se obriga a manter o seu cadastro sempre atualizado,
                  inclusive o número de seu celular e endereço de e-mail, sendo
                  de sua exclusiva e integral responsabilidade todas as
                  consequências decorrentes da omissão dessa obrigação. As
                  mensagens/notificações serão recebidas nos dispositivos móveis
                  desde que estejam ligados em área de cobertura da operadora de
                  telefonia móvel e/ou conectados à internet e desde que estejam
                  habilitados para receber tais mensagens/notificações. A mac
                  não se responsabiliza por eventuais atrasos, falhas ou
                  indisponibilidades da rede sem fio, da internet ou dos
                  serviços prestados pelas operadoras de telefonia móvel que
                  venham a prejudicar a transmissão das informações.
                </StyledParagraph>

                <StyledParagraph>
                  <b>6. CANCELAMENTO.</b> A <b>mac</b> poderá, sem prejuízo das
                  disposições acima, cessar imediatamente a disponibilização do 
                  <b>PORTAL RH - MachiCard</b>, no todo ou em parte, nas
                  seguintes hipóteses:(a) violação de qualquer disposição
                  contida nestes Termos; (b) não solicitação de macefício por 90
                  dias consecutivos; (c) cancelamento de todos os Cartões
                  mac e (d) descontinuidade da prestação do serviço pela 
                  <b>mac.</b>
                </StyledParagraph>

                <StyledParagraph>
                  <b>
                    7. POLÍTICA DE PRIVACIDADE. A Empresa declara saber que a
                    mac poderá utilizar cookies ou outras tecnologias similares
                    e coletar, tratar, armazenar e/ou compartilhar - entre as
                    empresas do Grupo macnabank e outros parceiros - informações
                    obtidas por ocasião da utilização do PORTAL RH - mac VISA
                    card para: (a) garantir maior segurança durante a sua
                    utilização; (b) aperfeiçoar a usabilidade, experiência e
                    interatividade do PORTAL RH - MachiCard; (c) fazer
                    ofertas de produtos e serviços e/ou fornecer informações
                    mais assertivas e relevantes às necessidades e interesses da
                    Empresa; (d) buscar maior eficiência em relação à frequência
                    e continuidade da comunicação da mac com a Empresa; (e)
                    responder dúvidas e solicitações; (f) realizar pesquisas de
                    comunicação e marketing de relacionamento, para melhorar os
                    produtos e serviços da mac, bem como apuração de
                    estatísticas em geral. O Usuário Principal e os Usuários
                    Secundários poderão, a qualquer momento, ativar ferramentas
                    nos seus dispositivos para identificar se os mecanismos
                    utilizados para a coleta de informações estão acionados ou,
                    ainda, para impedir que sejam.
                  </b>
                </StyledParagraph>

                <StyledParagraph>
                  7.1.
                  <b>
                    Os registros de acesso e demais informações coletadas por
                    meio da utilização do PORTAL RH - MachiCard são
                    protegidos e armazenados utilizando-se rígidos padrões de
                    sigilo e integridade, bem como controles de acesso físico e
                    lógico, observando-se sempre os mais elevados princípios
                    éticos e legais.
                  </b>
                </StyledParagraph>

                <StyledParagraph>
                  7.2.
                  <b>
                    Integram estes o Contrato de Prestação de Serviço de Emissão
                    e Gestão dos Cartões mac Refeição e mac Alimentação e os
                    Termos a Política de Privacidade do site da mac
                    (www.macvisacard.com.br), quando aplicáveis.
                  </b>
                </StyledParagraph>

                <StyledParagraph>
                  <b>8. TRATAMENTO E PROTEÇÃO DE DADOS PESSOAIS.</b> Nos termos
                  da Lei Geral de Proteção de Dados (Lei nº 13.709/18), a
                  Empresa reconhece que a mac poderá realizar o tratamento de
                  Dados Pessoais com finalidades específicas e de acordo com as
                  bases legais previstas na respectiva Lei, tais como: para o
                  devido cumprimento das obrigações legais e regulatórias, para
                  o exercício regular de direitos e para a proteção do crédito,
                  bem como, sempre que necessário, para a execução dos contratos
                  firmados com seus clientes ou para atender aos interesses
                  legítimos da mac, de seus clientes ou de terceiros. Para
                  qualquer outra finalidade, para a qual o consentimento do
                  titular deve ser coletado, o tratamento estará condicionado à
                  manifestação livre, informada e inequívoca do titular. Para
                  fins do quanto disposto nesta cláusula, “Dados Pessoais” se
                  refere a todas as informações relacionadas aos representantes
                  da Empresa.
                </StyledParagraph>

                <StyledParagraph>
                  8.1. A Empresa está ciente de que a <b>mac</b>, na condição de
                  controladora de dados nos termos da legislação aplicável,
                  poderá, quando for o caso, tratar, coletar, armazenar e
                  compartilhar com as sociedades sob controle direto ou indireto
                  do Banco macnabank (Brasil) S.A. (CNPJ nº 90.400.888/0001-42),
                  bem como sociedades controladoras, coligadas ou sob controle
                  comum (“Sociedades do Conglomerado macnabank”), sempre com a
                  estrita observância à Lei, os Dados Pessoais e informações
                  cadastrais, financeiras e de operações ativas e passivas e
                  serviços contratados para: (i) garantir maior segurança e
                  prevenir fraudes; (ii) assegurar sua adequada identificação,
                  qualificação e autenticação; (iii) prevenir atos relacionados
                  à lavagem de dinheiro e outros atos ilícitos; (iv) realizar
                  análises de risco de crédito; (v) aperfeiçoar o atendimento e
                  os produtos e serviços prestados; (vi) fazer ofertas de
                  produtos e serviços adequados e relevantes aos seus interesses
                  e necessidades de acordo com o perfil da Empresa; e (vii)
                  outras hipóteses baseadas em finalidades legítimas como apoio
                  e promoção de atividades da <b>mac</b> e das Sociedades do
                  Conglomerado macnabank ou para a prestação de serviços em
                  macefício da Empresa.
                </StyledParagraph>

                <StyledParagraph>
                  8.2. A <b>mac</b> poderá compartilhar Dados Pessoais
                  estritamente necessários para atender a finalidades
                  específicas, com fornecedores e prestadores de serviços,
                  incluindo empresas de telemarketing, de processamento de
                  dados, de tecnologia voltada à prevenção a fraudes ou
                  escritórios especializados em cobrança de dívidas ou para fins
                  de cessão de seus créditos.
                </StyledParagraph>

                <StyledParagraph>
                  8.3. A <b>mac</b> poderá fornecer Dados Pessoais sempre que
                  estiver obrigada, seja em virtude de disposição legal, ato de
                  autoridade competente ou ordem judicial.
                </StyledParagraph>

                <StyledParagraph>
                  8.4. O titular dos Dados Pessoais, tem direito a obter, em
                  relação aos seus dados tratados pela mac, a qualquer momento e
                  mediante requisição, nos termos da regulamentação, dentre
                  outros: (i) a confirmação da existência de tratamento; (ii) o
                  acesso aos dados; (iii) a correção de dados incompletos,
                  inexatos ou desatualizados; (iv) a anonimização, bloqueio ou
                  eliminação de Dados Pessoais desnecessários, excessivos ou
                  tratados em desconformidade com a lei; e (v) a portabilidade
                  dos dados a outro fornecedor de serviço ou produto, observados
                  os segredos comercial e industrial.
                </StyledParagraph>

                <StyledParagraph>
                  8.5. Mesmo após o término destes Termos, os Dados Pessoais e
                  outras informações a ele relacionadas poderão ser conservados
                  pela mac para cumprimento de obrigações legais e regulatórias,
                  bem como para o exercício regular de direitos pela <b>mac,</b>{" "}
                  pelos prazos previstos na legislação vigente.
                </StyledParagraph>

                <StyledParagraph>
                  A <b>mac</b> disponibiliza os seguintes canais de atendimento:{" "}
                  <b>Central de Atendimento:</b> (11) 4004-4474 (Capitais e
                  Regiões Metropolitanas) e 0800-723-4474 (demais localidades),
                  disponível de segunda a sexta-feira das 8h às 20h, exceto em
                  feriados nacionais. Serviço de Atendimento ao Consumidor –
                  SAC: 0800 723 5013 ou 0800 723 5014 (para deficientes
                  auditivos e de fala) disponível 24 horas por dia, 7 dias por
                  semana, para reclamações, elogios ou cancelamentos.
                </StyledParagraph>

                <StyledParagraph id="footer_term_privacy_id">
                  <b>mac macEFÍCIOS E SERVIÇOS S.A.</b> com sede na Av. das
                  Nações Unidas, 12.901, Torre Norte, 23º andar, CEP 04578-000,
                  São Paulo/SP e CNPJ/MF nº 30.798.783/0001-61 (“<b>mac</b>”).
                </StyledParagraph>
                <span id="end_of_term_privacy_id" />
              </div>
            </NewModal>
          </Unauthenticated>
        </ScrollToTop>
      </Fragment>
    );
  }
}

TermPrivacy.propTypes = {
  closeModal: func.isRequired,
  getUserStatusInfo: func.isRequired,
  isView: bool,
  goHome: func.isRequired,
  statusChargeBack: shape({}).isRequired,
  chargeBackTerms: shape().isRequired,
  postUserStatusTermInfo: func.isRequired,
  showToast: func,
  location: shape({}).isRequired,
};

TermPrivacy.defaultProps = {
  isView: false,
  showToast: () => null,
};

const mapStateToProps = ({ chargeBack, chargeBackModal, employee }) => ({
  statusChargeBack: chargeBack.chargebackRequest,
  chargeBackTerms: chargeBackModal.chargebackTerms,
  detailsHeader: employee.chargebackDetails.data.chargebacks,
});

const mapDispatchToProps = {
  closeModal: modalActions.CloseModal,
  openModal: openModalAction,
  getUserStatusInfo: getUserStatusAction,
  postUserStatusTermInfo: postUserStatusTermInfoAction,
  showToast: showToastAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(TermPrivacy);
