
package br.com.machina.estautoecapi.bean.credenciamento;

import br.com.machina.estautoecapi.bean.Endereco;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Estabelecimento {

    private String statusCadastro;

    @CNPJ
    private String cnpj;

    @NotBlank
    private String razaoSocial;

    @NotBlank
    private String nomeFantasia;

    private String telefone;

    private Endereco endereco;
}
