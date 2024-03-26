package br.com.machina.estautoecapi.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "PessoaFisicaRequest")
public class ValidaPessoaFisicaRequest implements Serializable {

     private String cpf;

     private String nome;

     private String nomeMae;

     private String logradouro;

     private LocalDate dataNascimento;

}
