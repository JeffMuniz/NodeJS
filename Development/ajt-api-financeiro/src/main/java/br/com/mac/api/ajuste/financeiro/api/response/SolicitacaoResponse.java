package br.com.mac.api.ajuste.financeiro.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolicitacaoResponse implements Serializable{

	private static final long serialVersionUID = -7629417562966444870L;
	
	private Meta meta;
    private List<Solicitacao> solicitacoes;

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Meta{
        private Long total;
        private Long limit;
        private Long offset;
    }

    @Builder
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Solicitacao{
        private Long id;
    }
}
