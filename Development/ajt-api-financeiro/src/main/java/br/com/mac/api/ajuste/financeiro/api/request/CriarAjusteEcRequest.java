package br.com.mac.api.ajuste.financeiro.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
public class CriarAjusteEcRequest {

    private CriarAjusteEcRequest.Ajuste ajuste;

    @Builder
    @Data
    @AllArgsConstructor
    public static class Ajuste{
        private String cnpj;
        private Integer idTipoAjusteLojista;
        private String dataVencimento;
        private BigDecimal valor;
    }

}
