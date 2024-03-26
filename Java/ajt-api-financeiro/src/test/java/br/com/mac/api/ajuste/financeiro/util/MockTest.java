package br.com.mac.api.ajuste.financeiro.util;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import br.com.mac.api.ajuste.financeiro.api.request.CriarSolicitacaoRequest;
import br.com.mac.api.ajuste.financeiro.api.response.SolicitacaoResponse;
import br.com.mac.api.ajuste.financeiro.api.response.SolicitacaoResponse.Meta;
import br.com.mac.api.ajuste.financeiro.api.response.SolicitacaoResponse.Solicitacao;
import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.SolicitacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;
import br.com.mac.api.ajuste.financeiro.persistence.StatusEntity;
import br.com.mac.api.ajuste.financeiro.persistence.TipoEntity;

/**
 * Classe MockTest - Mocks para testes unitarios e integrados
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
public abstract class MockTest {

	/** Constante ANY_INT. */
	public static final int ANY_INT = 1;

	/** Constante ANY_LONG. */
	public static final Long ANY_LONG = 1L;

	/**
	 * Mock de entidade de ajuste financeiro
	 * @return AjusteFinanceiroCucumber
	 */
	public static Optional<AjusteFinanceiroEntity> mockAjusteFinanceiroEntity(TipoEnum tipoEnum) {
		AjusteFinanceiroEntity ajuste = new AjusteFinanceiroEntity();
		ajuste.setId(ANY_INT);
		ajuste.setLoginUsuario("teste@macvisacard.com.br");
		ajuste.setNomeUsuario("Teste Unitário");
		ajuste.setIdSolicitacao(13);
		ajuste.setCodExterno(123123);
		ajuste.setCliente(MockTest.mockClienteCnpjEntity().get());
		ajuste.setDataCriacao(ZonedDateTime.now());
		ajuste.setDataModificacao(ZonedDateTime.now());
		ajuste.setDataVencimento(ZonedDateTime.now());
		ajuste.setObservacao("Teste de unidade");
		ajuste.setStatus(MockTest.mockStatusEntity().get());
		ajuste.setTipo(MockTest.mockTipoEntity(tipoEnum).get());
		ajuste.setValor(new BigDecimal("100"));
		return Optional.of(ajuste);
	}

	/**
	 * Mock de entidade de cliente
	 * @return ClienteEntity
	 */
	private static Optional<ClienteEntity> mockClienteCnpjEntity() {
		ClienteEntity cliente = new ClienteEntity();
		cliente.setId(ANY_INT);
		cliente.setNome(StatusEnum.APROVADO.name());
		cliente.setCnpj("22746938000123");
		cliente.setDataCriacao(ZonedDateTime.now());
		cliente.setDataModificacao(ZonedDateTime.now());
		return Optional.of(cliente);
	}

	/**
	 * Mock de entidade de status
	 *
	 * @return StatusEntity
	 */
	public static Optional<StatusEntity> mockStatusEntity() {
		StatusEntity status = new StatusEntity();
		status.setId(ANY_INT);
		status.setNome(StatusEnum.APROVADO.name());
		status.setDescricao(StatusEnum.APROVADO.name());
		status.setDataCriacao(ZonedDateTime.now());
		status.setDataModificacao(ZonedDateTime.now());
		return Optional.of(status);
	}

	/**
	 * Mock de entidade de tipo
	 *
	 * @return TipoEntity
	 */
	public static Optional<TipoEntity> mockTipoEntity(TipoEnum tipoEnum) {
		TipoEntity tipo = new TipoEntity();
		tipo.setId(ANY_INT);
		tipo.setNome(tipoEnum.name());
		tipo.setDescricao(tipoEnum.name());
		tipo.setDataCriacao(ZonedDateTime.now());
		tipo.setDataModificacao(ZonedDateTime.now());
		return Optional.of(tipo);
	}

	/**
	 * Mock de entidade de tipo
	 *
	 * @return TipoEntity
	 */
	public static Optional<MotivoEntity> mockMotivoEntity() {
		MotivoEntity motivo = new MotivoEntity();
		motivo.setId(ANY_INT);
		motivo.setTipo(MockTest.mockTipoEntity(TipoEnum.getEnum("EC")).get());
		motivo.setOperacao(OperacaoEnum.CREDITO.getValue());
		motivo.setNome(StatusEnum.APROVADO.name());
		motivo.setDescricao(StatusEnum.APROVADO.name());
		motivo.setAtivo(true);
		motivo.setDataCriacao(ZonedDateTime.now());
		motivo.setDataModificacao(ZonedDateTime.now());
		return Optional.of(motivo);
	}
	
	/**
	 * Mock de entidade de tipo
	 *
	 * @return TipoEntity
	 */
	public static Optional<List<MotivoEntity>> mockMotivoListEntity() {
		List<MotivoEntity>list = new ArrayList<>();
		list.add(mockMotivoEntity().get());
		list.add(mockMotivoEntity().get());
		return Optional.of(list);
	}

	/**
	 * Mock da entrada para criar uma solicitacao em aprovacao api
	 * @return CriarSolicitacaoRequest
	 */
	public static CriarSolicitacaoRequest mockRequestAprovacaoAPI() {
		CriarSolicitacaoRequest request = new CriarSolicitacaoRequest(
				new ArrayList<CriarSolicitacaoRequest.Solicitacao>());
		CriarSolicitacaoRequest.Solicitacao solicitacao = CriarSolicitacaoRequest.Solicitacao.builder()
                .tipo(new CriarSolicitacaoRequest.Id(SolicitacaoEnum.EC_CREDITO.getCodigo().intValue()))
                .usuario(new CriarSolicitacaoRequest.Usuario("teste@mac.com.br", "Teste Uniario"))
                .cliente(new CriarSolicitacaoRequest.Cliente("mac", "40882212608", ""))
                .operacaoExterno(new CriarSolicitacaoRequest.Id(12))
                .valor(new BigDecimal(20))
                .build();
		request.getSolicitacoes().add(solicitacao);
		return request;
	}
	

	/**
	 * Mock da saida para criar uma solicitacao em aprovacao api
	 * @return SolicitacaoResponse
	 */
	public static SolicitacaoResponse mockResponseAprovacaoAPI() {
		SolicitacaoResponse response = new SolicitacaoResponse();
		response.setMeta(Meta.builder().limit(1L).offset(1L).total(1L).build());
		response.setSolicitacoes(new ArrayList<SolicitacaoResponse.Solicitacao>());
		response.getSolicitacoes().add(Solicitacao.builder().id(111L).build());
		return response;
	}
	

}
