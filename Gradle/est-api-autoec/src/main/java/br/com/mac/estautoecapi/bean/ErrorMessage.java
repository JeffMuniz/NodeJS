package br.com.machina.estautoecapi.bean;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
@Data
public class ErrorMessage implements Serializable {

     /**
     */
     private static final long serialVersionUID = 7436752933344238935L;

     @Schema(name = "Código do Erro", defaultValue = "123")
     private String code;

     @Schema(name = "Mensagem do Erro", defaultValue = "Erro: CNPJ inválido.")
     private String message;
}
