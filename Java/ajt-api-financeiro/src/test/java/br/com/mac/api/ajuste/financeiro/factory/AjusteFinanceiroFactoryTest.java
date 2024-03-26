package br.com.mac.api.ajuste.financeiro.factory;

import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.persistence.*;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Random;

@NoArgsConstructor
public class AjusteFinanceiroFactoryTest {


    public static AjusteFinanceiroEntity ajusteEcCreditoPendente(
            final ClienteEntity clienteEntity) {
        return AjusteFinanceiroEntity.builder()
                .tipo(TipoEntity.builder().id(TipoEnum.EC.getValue()).build())
                .cliente(clienteEntity)
                .status(StatusEntity.builder().id(StatusEnum.PENDENTE.getValue()).build())
                .loginUsuario("teste1@macvisacard.com.br")
                .nomeUsuario("Teste Solicitante 1")
                .idSolicitacao(1)
                .operacao(OperacaoEnum.CREDITO.getValue())
                .codExterno(new Random().nextInt(1000))
                .motivo(MotivoEntity.builder().id(2).build())
				.observacao("Solicitação de ajuste")
				.valor(new BigDecimal("20"))
				.dataVencimento(ZonedDateTime.parse("2020-08-08T23:59:59-03:00"))
				.dataFinalizacao(null)
				.dataCriacao(ZonedDateTime.parse("2020-02-20T23:59:59-03:00"))
				.dataModificacao(ZonedDateTime.parse("2020-02-20T23:59:59-03:00")).build();
	}

	public static AjusteFinanceiroEntity ajustePortadorDebitoAprovado(
			final ClienteEntity clienteEntity) {
		return AjusteFinanceiroEntity.builder()
                .tipo(TipoEntity.builder().id(TipoEnum.PORTADOR.getValue()).build())
                .cliente(clienteEntity)
                .status(StatusEntity.builder().id(StatusEnum.APROVADO.getValue()).build())
                .loginUsuario("teste1@macvisacard.com.br")
                .nomeUsuario("Teste Solicitante 1")
                .idSolicitacao(2)
                .operacao(OperacaoEnum.DEBITO.getValue())
                .codExterno(new Random().nextInt(1000))
                .motivo(MotivoEntity.builder().id(2).build())
				.observacao("Solicitação de ajuste")
				.valor(new BigDecimal("30000.60"))
				.dataVencimento(ZonedDateTime.parse("2020-08-08T23:59:59-03:00"))
				.dataFinalizacao(ZonedDateTime.parse("2020-03-05T23:59:59-03:00"))
				.dataCriacao(ZonedDateTime.parse("2020-03-05T23:59:59-03:00"))
				.dataModificacao(ZonedDateTime.parse("2020-03-05T23:59:59-03:00")).build();
	}

	public static AjusteFinanceiroEntity ajusteRHCreditoPendente(
			final ClienteEntity clienteEntity) {
		return AjusteFinanceiroEntity.builder()
                .tipo(TipoEntity.builder().id(TipoEnum.RH.getValue()).build())
                .cliente(clienteEntity)
                .status(StatusEntity.builder().id(StatusEnum.PENDENTE.getValue()).build())
                .loginUsuario("teste2@macvisacard.com.br")
                .nomeUsuario("Teste Solicitante 2")
                .idSolicitacao(3)
                .operacao(OperacaoEnum.CREDITO.getValue())
                .codExterno(new Random().nextInt(1000))
                .motivo(MotivoEntity.builder().id(16).build())
				.observacao("Solicitação de ajuste")
				.valor(new BigDecimal("20"))
				.dataVencimento(ZonedDateTime.parse("2020-08-08T23:59:59-03:00"))
				.dataFinalizacao(null)
				.dataCriacao(ZonedDateTime.parse("2020-03-11T23:59:59-03:00"))
				.dataModificacao(ZonedDateTime.parse("2020-03-11T23:59:59-03:00")).build();
	}

	public static AjusteFinanceiroEntity ajustePortadorCreditoRecusado(
			final ClienteEntity clienteEntity) {
		return AjusteFinanceiroEntity.builder()
                .tipo(TipoEntity.builder().id(TipoEnum.PORTADOR.getValue()).build())
                .cliente(clienteEntity)
                .status(StatusEntity.builder().id(StatusEnum.RECUSADO.getValue()).build())
                .loginUsuario("teste2@macvisacard.com.br")
                .nomeUsuario("Teste Solicitante 2")
                .idSolicitacao(4)
                .operacao(OperacaoEnum.CREDITO.getValue())
                .codExterno(new Random().nextInt(1000))
                .motivo(MotivoEntity.builder().id(2).build())
				.observacao("Solicitação de ajuste")
				.valor(new BigDecimal("250"))
				.dataVencimento(ZonedDateTime.parse("2020-08-08T23:59:59-03:00"))
				.dataFinalizacao(ZonedDateTime.parse("2020-01-07T23:59:59-03:00"))
				.dataCriacao(ZonedDateTime.parse("2020-01-05T23:59:59-03:00"))
				.dataModificacao(ZonedDateTime.parse("2020-01-07T23:59:59-03:00")).build();
	}

    public static AjusteFinanceiroEntity ajustePortadorDebitoPendenteUm(
			final ClienteEntity clienteEntity) {
		return AjusteFinanceiroEntity.builder()
                .tipo(TipoEntity.builder().id(TipoEnum.PORTADOR.getValue()).build())
                .cliente(clienteEntity)
                .status(StatusEntity.builder().id(StatusEnum.PENDENTE.getValue()).build())
                .loginUsuario("teste3@macvisacard.com.br")
                .nomeUsuario("Teste Solicitante 3")
                .idSolicitacao(5)
                .operacao(OperacaoEnum.DEBITO.getValue())
                .codExterno(new Random().nextInt(1000))
                .motivo(MotivoEntity.builder().id(2).build())
				.observacao("Solicitação de ajuste")
				.valor(new BigDecimal("83.55"))
				.dataVencimento(ZonedDateTime.parse("2020-08-08T23:59:59-03:00"))
				.dataFinalizacao(null)
				.dataCriacao(ZonedDateTime.parse("2020-01-08T23:59:59-03:00"))
				.dataModificacao(ZonedDateTime.parse("2020-01-08T23:59:59-03:00")).build();
	}

    public static AjusteFinanceiroEntity ajustePortadorDebitoPendenteDois(
			final ClienteEntity clienteEntity) {
		return AjusteFinanceiroEntity.builder()
                .tipo(TipoEntity.builder().id(TipoEnum.PORTADOR.getValue()).build())
                .cliente(clienteEntity)
                .status(StatusEntity.builder().id(StatusEnum.PENDENTE.getValue()).build())
                .loginUsuario("teste3@macvisacard.com.br")
                .nomeUsuario("Teste Solicitante 3")
                .idSolicitacao(6)
                .operacao(OperacaoEnum.DEBITO.getValue())
                .codExterno(new Random().nextInt(1000))
                .motivo(MotivoEntity.builder().id(2).build())
				.observacao("Solicitação de ajuste")
				.valor(new BigDecimal("97"))
				.dataVencimento(ZonedDateTime.parse("2020-08-08T23:59:59-03:00"))
				.dataFinalizacao(null)
				.dataCriacao(ZonedDateTime.parse("2020-02-08T23:59:59-03:00"))
				.dataModificacao(ZonedDateTime.parse("2020-02-08T23:59:59-03:00")).build();
	}


}

