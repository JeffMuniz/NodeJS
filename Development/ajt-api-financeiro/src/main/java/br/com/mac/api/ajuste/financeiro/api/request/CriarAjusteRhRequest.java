package br.com.mac.api.ajuste.financeiro.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
@Builder
@Data
@AllArgsConstructor
public class CriarAjusteRhRequest {

    private Integer idConta;
    private Integer idPedido;
    private String motivo;
    private String origem;
    private BigDecimal valor;
    

}
