package br.com.machina.estautoecapi.bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "PESSOA_FISICA_CACHE")
public class PessoaFisicaResponse implements Serializable {

    private static final long serialVersionUID = 2613911658282461942L;

    @Id
    private String id;

    @Indexed(unique = true)
    private String cpf;

    private String nome;
    private List<String> nomes;

    private String nomeMae;
    private List<String> nomesMae;

    private String sexo;

    private Status status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Indexed(expireAfterSeconds = 432000)
    private LocalDate dataConsulta;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Indexed(expireAfterSeconds = 432000)
    private LocalDate dataNascimento;
    private List<LocalDate> datasNascimento;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<ErrorMessage> erros;

    public void ocultarValores(){
        this.nome = null;
        this.nomeMae = null;
        this.dataNascimento = null;
    }
}
