package br.com.mac.api.ajuste.financeiro.api.request;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class CriarSolicitacaoRequest {

    private List<CriarSolicitacaoRequest.Solicitacao> solicitacoes;
	
    @Builder
    @Data
    @AllArgsConstructor
    public static class Solicitacao{
		
	    private CriarSolicitacaoRequest.Id tipo;
	
	    private CriarSolicitacaoRequest.Usuario usuario;
	
	    private CriarSolicitacaoRequest.Cliente cliente;
	
	    private CriarSolicitacaoRequest.Id operacaoExterno;

	    private List<CriarSolicitacaoRequest.Detalhe> detalhe;

	    private String documento;
	
	    private BigDecimal valor;
    
    }

    @Builder
    @Data
    @AllArgsConstructor
    public static class Id{
        private Integer id;
    }

    @Builder
    @Data
    @AllArgsConstructor
    public static class Usuario{
        private String loginUsuario;
        private String nomeUsuario;
    }

    @Builder
    @Data
    @AllArgsConstructor
    public static class Detalhe{
        private String campo;
        private String valor;
    }

    @Builder
    @Data
    @AllArgsConstructor
    public static class Cliente{
        private String nome;
        private String cpf;
        private String cnpj;
    }

    public static List<CriarSolicitacaoRequest.Detalhe> converterHashMapDetalhe(LinkedHashMap<String, String> valores){
        List<CriarSolicitacaoRequest.Detalhe> detalhes
                = new ArrayList<CriarSolicitacaoRequest.Detalhe>();
        valores.forEach((key, value) -> {
            detalhes.add(new Detalhe(key, value));
        });
        return detalhes;
    }

}
