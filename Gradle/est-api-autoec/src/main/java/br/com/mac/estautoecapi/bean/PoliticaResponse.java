package br.com.machina.estautoecapi.bean;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "POLITICA_RESPONSE_CACHE")
@Schema(description = "politicaResponse")
public class PoliticaResponse implements Serializable {

    public static final Predicate<Socio> SOCIOS_COM_CPF_VALIDO = socio -> socio.getCpf() != null && !"99999999999".equals(socio.getCpf());

    private static final long serialVersionUID = 2613911658282461942L;

    @Id
    @Schema(description = "Identificação do estabelicimento na Neurotech.", required = true)
    private String id;

    @Schema(description = "Identificação da Proposta da Neurotech.")
    private String idProposta;

    @Schema(description = "Codigo do estabelicimento na Neurotech.")
    private Long codigoNeurotech;

    @Indexed(unique = true)
    @Schema(description = "CNPJ do estabelecimento", example = "12345678912345")
    private String cnpj;

    @Schema(description = "Razão Social do Estabelecimento", example = "BLUE LTDA")
    private String razaoSocial;

    @Schema(description = "Nome Fantasia do Estabelecimento", example = "Projeto BLUE")
    private String nomeFantasia;

    @Schema(description = "Inscrição Estadual do Estabelecimento", example = "123.456")
    private String inscricaoEstadual;

    @Schema(description = "Status of the voucher", example = "true")
    private Boolean isenta;

    @Schema(description = "CNAE do Estabelecimento", example = "1234567")
    private String cnae;

    @Schema(description = "Sub-cnae do Estabelecimento", example = "12345")
    private String subCnae;

    @Schema(description = "Endereço do Estabelecimento")
    private Endereco endereco;

    @Schema(description = "Lista de sócios do Estabelecimento")
    private List<Socio> socios;

    @Schema(description = "Status da Análise do Estabelecimento", example = "LIBERADO")
    private Status status;

    @Schema(description = "Código de Status da Análise do Estabelecimento", example = "200")
    private String statusCode;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Schema(description = "Data de consulta do Estabelecimento", example = "2018-01-01")
    @Indexed(expireAfterSeconds = 432000)
    private LocalDate dataConsulta;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Lista de Erros Obtidos no Motor de Politicas", example = "")
    private List<ErrorMessage> erros;

    @Schema(description = "CNAE Secundário do Estabelecimento", example = "1234567")
    private String cnaeSecundario;

    @Schema(description = "Lista de CNAEs Secundários do Estabelecimento", example = "[\"123456\", \"654321\"]")
    private List<String> cnaesSecundarios;

    public void filtraSocios(Predicate<Socio> filtro) {
        if (socios != null)
            socios = socios.stream()
                    .filter(filtro)
                    .collect(Collectors.toList());
    }
}
