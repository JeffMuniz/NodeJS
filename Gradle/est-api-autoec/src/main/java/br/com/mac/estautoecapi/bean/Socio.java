package br.com.machina.estautoecapi.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Schema(description = "Socio")
public class Socio implements Serializable {

     private static final long serialVersionUID = -1565099447669841352L;

     @Schema(description = "Nome do sócio", example = "Paulo Henrique")
     private String nome;

     @Schema(description = "CPF do Sócio", example = "12345678910")
     private String cpf;
}
