package br.com.mac.api.ajuste.financeiro.enums;

import java.util.stream.Stream;

import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum MotivoExternoEnum {

	PAGAMENTO_PEDIDO_DUPLICIDADE(16, "Recebimento a maior");

	//Definir os campos dos Motivos externos aceitos exemplo: PAGAMENTO_PEDIDO_CANCELADO(0, "")

    @Getter
    private Integer value;

    @Getter
    private String descricao;
    
    /**
     * Busca enum Name por idMotivo
     * @param value - idMotivo
     * @return  String
     */
    public static String getEnumName(int value) {

    	MotivoExternoEnum motivoExt = Stream.of(MotivoExternoEnum.values())
   	         .filter(item -> item.getValue() == value)
	   	     .findFirst().orElseThrow(() ->
	                 new NotFoundException(
		                 ExceptionsMessagesEnum.MOTIVO_EXTERNO_NAO_ENCONTRADO.getMessage()));
    	return motivoExt.name();
    }    
}
