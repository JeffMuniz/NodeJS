package br.com.mac.api.ajuste.financeiro.web.api.mapper;

import static java.text.MessageFormat.format;

import java.math.BigDecimal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.web.api.dto.AjusteFinanceiroQueryParamsDto;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiro;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBody;
import br.com.mac.api.ajuste.financeiro.web.api.model.Meta;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import lombok.NonNull;

@Component
public class AjusteFinanceiroMapper {

    public static AjusteFinanceiro serialize(@NonNull final Page<AjusteFinanceiroEntity> pageAjusteFinanceiroEntity) {
        final var ajusteFinanceiro = new AjusteFinanceiro();
        final var ajusteFinanceiroBody = new ArrayList<AjusteFinanceiroBody>();

        ajusteFinanceiro.setMeta(new Meta().total((int) pageAjusteFinanceiroEntity.getTotalElements())
                .limit(pageAjusteFinanceiroEntity.getPageable().getPageSize())
                .offset(pageAjusteFinanceiroEntity.getPageable().getPageNumber() + 1));

        pageAjusteFinanceiroEntity.getContent().forEach(ajusteFinanceiroEntity -> ajusteFinanceiroBody.add(
                AjusteFinanceiroBodyMapper.serialize(ajusteFinanceiroEntity)));

        ajusteFinanceiro.setAjustes(ajusteFinanceiroBody);

        return ajusteFinanceiro;
    }

    public static AjusteFinanceiroQueryParamsDto serialize(final Integer id,
                                                           final Integer idSolicitacao,
                                                           final String tipo,
                                                           final String operacao,
                                                           final String status,
                                                           final String clienteNome,
                                                           final String clienteCpf,
                                                           final String clienteCnpj,
                                                           final String dataCriacaoInicial,
                                                           final String dataCriacaoFinal,
                                                           final String dataFinalizacaoInicial,
                                                           final String dataFinalizacaoFinal,
                                                           final Double valor,
                                                           final Double valorMaiorque,
                                                           final Double valorMenorque) {
        return AjusteFinanceiroQueryParamsDto.builder()
                .id(id)
                .idSolicitacao(idSolicitacao)
                .tipo(tipo != null ? TipoEnum.valueOf(tipo) : null)
                .operacao(operacao != null ? OperacaoEnum.valueOf(operacao) : null)
                .status(status != null ? StatusEnum.valueOf(status) : null)
                .clienteNome(clienteNome)
                .clienteCpf(Optional.ofNullable(clienteCpf)
                        .map(cpf -> new CryptTransformImpl().encryptCpfWithNoMask(cpf))
                        .orElse(null))
                .clienteCnpj(Optional.ofNullable(clienteCnpj)
                        .map(cnpj -> new CryptTransformImpl().encryptCnpjWithNoMask(cnpj))
                        .orElse(null))
                .valor(Optional.ofNullable(valor)
                        .map(BigDecimal::new)
                        .orElse(null))
                .valorMaiorQue(Optional.ofNullable(valorMaiorque)
                        .map(Object::toString)
                        .map(BigDecimal::new)
                        .orElse(null))
                .valorMenorQue(Optional.ofNullable(valorMenorque)
                        .map(Object::toString)
                        .map(BigDecimal::new)
                        .orElse(null))
                .dataCriacao(AjusteFinanceiroMapper.getDataCriacao(dataCriacaoInicial, dataCriacaoFinal))
                .dataFinalizacao(AjusteFinanceiroMapper.getDataCriacao(dataFinalizacaoInicial, dataFinalizacaoFinal))
                .build();
    }

    private static AjusteFinanceiroQueryParamsDto.DataInicialFinal getDataCriacao(final String dataInicial,
                                                                                  final String dataFinal) {
        return dataInicial != null ? AjusteFinanceiroMapper.setDataCriacao(dataInicial, dataFinal) : null;
    }

    private static AjusteFinanceiroQueryParamsDto.DataInicialFinal setDataCriacao(@NonNull final String dataCriacao,
                                                                                  final String dataCriacaoFinal) {

        final var dataInicialFinal = AjusteFinanceiroQueryParamsDto.DataInicialFinal.builder();

        dataInicialFinal.dataInicial(ZonedDateTime.parse(
                format("{0} 01:00:00 {1}", dataCriacao, ZoneId.systemDefault()),
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z")));

        dataInicialFinal.dataFinal(dataCriacaoFinal != null
                ? ZonedDateTime.parse(format("{0} 23:59:59 {1}", dataCriacaoFinal,
                ZoneId.systemDefault()),
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z"))
                : ZonedDateTime.parse(
                format("{0} 23:59:59 {1}", dataCriacao, ZoneId.systemDefault()),
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z")));

        return dataInicialFinal.build();
    }
}
