package br.com.mac.api.ajuste.financeiro.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum ExceptionsMessagesEnum {

    GLOBAL_ERRO_SERVIDOR("Erro interno de servidor."),

    OBJETO_VAZIO_OU_NULL("Objeto vazio ou nulo."),

    REGRA_NAO_IMPL("Regra não implementada."),

    ENTRADA_INVALIDA("Entrada para inclusão de ajuste inválida."),

    TIPO_OPERACAO_NAO_ENCONTRADO("Tipo operação não encontrado."),

    OPERACAO_NAO_ENCONTRADO("Operação não encontrado."),

    STATUS_NAO_ENCONTRADO("Status de solicitação não encontrado."),

    MOTIVO_NAO_ENCONTRADO("Motivo não encontrado."),

    TIPO_NAO_IMPLEMENTADO("Tipo operação não implementado."),

    STATUS_NAO_PERMITIDO("Status do ajuste financeiro não permitido."),

    AJUSTE_NAO_ENCONTRADO("Ajuste Financeiro não encontrado."),
    
    AJUSTE_DATA_MENOR_DOIS_DIAS("RECUSADO: Data de vencimento menor que 2 dias úteis"),

	MOTIVO_EXTERNO_NAO_ENCONTRADO("Motivo externo não encontrado.");

	@Getter
    private String message;
}
