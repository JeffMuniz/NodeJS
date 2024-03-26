package br.com.mac.api.ajuste.financeiro.web.api.dto;

import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AjusteFinanceiroQueryParamsDto implements Serializable {

    private static final long serialVersionUID = -6268679550603670682L;

    public Integer id;
    public Integer idSolicitacao;
    public TipoEnum tipo;
    public OperacaoEnum operacao;
    public StatusEnum status;
    public String clienteNome;
    public String clienteCpf;
    public String clienteCnpj;
    public DataInicialFinal dataCriacao;
    public DataInicialFinal dataFinalizacao;
    public BigDecimal valor;
    public BigDecimal valorMaiorQue;
    public BigDecimal valorMenorQue;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DataInicialFinal implements Serializable {

		private static final long serialVersionUID = -5327134735938533116L;

        public ZonedDateTime dataInicial;
        public ZonedDateTime dataFinal;
    }

}
