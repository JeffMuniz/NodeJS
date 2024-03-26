import React, { FC } from 'react';
import { navigateToUrl } from 'single-spa';
import { Header as AntHeader, Menu, Logo } from '@mac/shared-ui';

import UserAvatar from './UserAvatar.component';
import { dateToUtcDateString } from '@/utils/format.util';

const { SubMenu, Item } = Menu;

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;

const AppHeader: FC = () => {
  const yesterday = new Date(Date.now() - DAY_TIMESTAMP);

  return (
    <AntHeader
      userAvatar={<UserAvatar />}
      logo={
        <a href="/aprovacoes" onClick={navigateToUrl}>
          <Logo negative />
        </a>
      }>
      {/******** MENU OPERACOES ********/}
      <SubMenu
        key="menu_operacoes"
        title={
          <span>
            <span>Operações</span>
          </span>
        }>
        {/* <Item key="prod1">EX. - Tangiveis</Item> */}
      </SubMenu>
      {/******** FIM MENU OPERACOES ********/}

      {/******** MENU Backoffice Fin. ********/}
      <SubMenu
        key="menu_backofficefin"
        title={
          <span>
            <span>Backoffice Fin.</span>
          </span>
        }>
        <SubMenu
          key="menu_RH"
          title={
            <span>
              <span>RH</span>
            </span>
          }>
          <Item key="pedido_fechamento">
            <a href="/pedidos/fechamento" onClick={navigateToUrl}>
              Fechamento de Pedido
            </a>
          </Item>
          <Item key="pedido_antecipacao">
            <a href="/pedidos/antecipacao" onClick={navigateToUrl}>
              Antecipação de Crédito
            </a>
          </Item>
          <Item key="pedido_unificado">
            <a href="/pedidos/faturamento-unificado" onClick={navigateToUrl}>
              Faturamento Unificado
            </a>
          </Item>
        </SubMenu>
        <SubMenu
          key="menu_EC"
          title={
            <span>
              <span>EC</span>
            </span>
          }>
          <Item key="ec">
            <a href="/ec" onClick={navigateToUrl}>
              Status EC
            </a>
            /
          </Item>
          <Item key="pagamento">
            <a href="/pagamento" onClick={navigateToUrl}>
              Pagamento EC
            </a>
          </Item>
        </SubMenu>
        <SubMenu
          key="menu_Portador"
          title={
            <span>
              <span>Portador</span>
            </span>
          }>
          <Item key="transacao">
            <a href="/transacao" onClick={navigateToUrl}>
              Transação portador
            </a>
          </Item>
        </SubMenu>
        <Item key="financeiro">
          <a href="/financeiro" onClick={navigateToUrl}>
            Ajuste financeiro
          </a>
        </Item>
      </SubMenu>
      {/******** FIM MENU Backoffice Fin. ********/}

      {/******** MENU Finanças ********/}
      <SubMenu
        key="menu_financas"
        title={
          <span>
            <span>Finanças</span>
          </span>
        }>
        <Item key="financeiro">
          <a
            href={`/financeiro/details/${dateToUtcDateString(yesterday)}`}
            onClick={navigateToUrl}>
            Conciliação
          </a>
        </Item>
        <Item key="financeiro/historico-incidentes">
          <a href="/financeiro/historico-incidentes" onClick={navigateToUrl}>
            Incidentes
          </a>
        </Item>
        <Item key="financeiro/historico">
          <a href="/financeiro/historico" onClick={navigateToUrl}>
            Histórico
          </a>
        </Item>
        <Item key="financeiro/parametro">
          <a href="/financeiro/parametro" onClick={navigateToUrl}>
            Parâmetro contábil
          </a>
        </Item>
        {/* <Item key="concilicao">
          <a href="/" onClick={navigateToUrl}>
            Ex - Conciliação
          </a>
        </Item>
        <Item key="arqcont">
          <a href="/" onClick={navigateToUrl}>
            Ex - Arq. Contabeis
          </a>
        </Item> */}
      </SubMenu>
      {/******** FIM MENU Finanças ********/}

      {/******** MENU Aprovações ********/}
      <SubMenu
        key="menu_aprovacoes"
        title={
          <span>
            <span>Aprovações</span>
          </span>
        }>
        <Item key="aprovacao">
          <a href="/aprovacoes" onClick={navigateToUrl}>
            Aprovação
          </a>
        </Item>
      </SubMenu>
      {/******** FIM MENU AUTORIZACAO ********/}

      {/******** MENU EXTRATO ********/}
      <SubMenu
        key="menu_extrato"
        title={
          <span>
            <span>Extrato</span>
          </span>
        }>
        <Item key="extrato_grupo">
          <a href="/extrato/grupo" onClick={navigateToUrl}>
            Grupo
          </a>
        </Item>
        <Item key="extrato_estabelecimento">
          <a href="/extrato/estabelecimento" onClick={navigateToUrl}>
            Estabelecimento
          </a>
        </Item>
        <Item key="extrato_conciliadora">
          <a href="/extrato/conciliadora" onClick={navigateToUrl}>
            Conciliadora
          </a>
        </Item>
        <Item key="extrato_rastreio_transacao">
          <a href="/extrato/rastreio-transacao" onClick={navigateToUrl}>
            Rastreio de transação
          </a>
        </Item>
        <Item key="extrato_reenvio">
          <a href="/extrato/reenvio" onClick={navigateToUrl}>
            Reenvio
          </a>
        </Item>
        <Item key="extrato_reprocessamento">
          <a href="/extrato/reprocessamento" onClick={navigateToUrl}>
            Reprocessamento
          </a>
        </Item>
      </SubMenu>
      {/******** FIM MENU EXTRATO ********/}
    </AntHeader>
  );
};

export default AppHeader;
