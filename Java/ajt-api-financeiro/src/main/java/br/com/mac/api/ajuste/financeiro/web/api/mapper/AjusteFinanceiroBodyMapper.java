package br.com.mac.api.ajuste.financeiro.web.api.mapper;

import java.time.format.DateTimeFormatter;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBody;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBodyCliente;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBodyMotivo;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBodyOperacao;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBodyStatus;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBodyTipo;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import lombok.NonNull;

@Component
public class AjusteFinanceiroBodyMapper {

    public static AjusteFinanceiroBody serialize(@NonNull final AjusteFinanceiroEntity solicitacaoEntity) {

        final var ajusteFinanceiroBody = new AjusteFinanceiroBody();
        final var cliente = solicitacaoEntity.getCliente();
        final var tipo = solicitacaoEntity.getTipo();
        final var operacao = OperacaoEnum.getEnum(solicitacaoEntity.getOperacao());
        final var status = solicitacaoEntity.getStatus();

        ajusteFinanceiroBody.id(solicitacaoEntity.getId());
        ajusteFinanceiroBody.tipo(new AjusteFinanceiroBodyTipo()
                .id(tipo.getId())
                .nome(tipo.getNome()));
        ajusteFinanceiroBody.cliente(new AjusteFinanceiroBodyCliente()
                .id(cliente.getId())
                .nome(cliente.getNome())
                .cnpj(StringUtils.isEmpty(cliente.getCnpj()) ? null :
                	new CryptTransformImpl().decryptAes(cliente.getCnpj()))
                .cpf(StringUtils.isEmpty(cliente.getCpf()) ? null :
                	new CryptTransformImpl().decryptAes(cliente.getCpf()))
                .idConta(cliente.getIdConta())
                .descricaoConta(cliente.getDescricaoConta()));
        ajusteFinanceiroBody.motivo(new AjusteFinanceiroBodyMotivo()
                .id(solicitacaoEntity.getMotivo().getId())
                .descricao(solicitacaoEntity.getMotivo().getDescricao()));
        ajusteFinanceiroBody.status(new AjusteFinanceiroBodyStatus()
                .id(status.getId())
                .nome(status.getNome().toUpperCase()));
        ajusteFinanceiroBody.loginUsuario(solicitacaoEntity.getLoginUsuario());
        ajusteFinanceiroBody.nomeUsuario(solicitacaoEntity.getNomeUsuario());
        ajusteFinanceiroBody.idSolicitacao(solicitacaoEntity.getIdSolicitacao());
        ajusteFinanceiroBody.operacao(new AjusteFinanceiroBodyOperacao()
                .id(operacao.getValue())
                .descricao(operacao.getDescricao()));
        ajusteFinanceiroBody.codigoExterno(solicitacaoEntity.getCodExterno());
        ajusteFinanceiroBody.observacao(solicitacaoEntity.getObservacao());
        ajusteFinanceiroBody.valor(solicitacaoEntity.getValor().doubleValue());
        ajusteFinanceiroBody.dataCriacao(solicitacaoEntity.getDataCriacao()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")));
        ajusteFinanceiroBody.dataFinalizacao(solicitacaoEntity.getDataFinalizacao() == null ?
                StringUtils.EMPTY : solicitacaoEntity.getDataFinalizacao()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")));
        ajusteFinanceiroBody.dataVencimento(solicitacaoEntity.getDataVencimento()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")));

        return ajusteFinanceiroBody;
    }

}
