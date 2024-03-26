package br.com.machina.estautoecapi.bean.credenciamento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("DADOS_CREDENCIAMENTO")
public class DadosCredenciamento {

    @Id
    private String id;

    private LocalDate dataCriacao;

    private LocalDate dataAtualizacao;

    private LocalDate dataEnvio;

    private String origem;

    private String statusCredenciamento;

    private Proprietario proprietario;

    private Estabelecimento estabelecimento;

    private QuestionarioPAT questionarioPAT;

    @Default
    private List<Produto> produtos = null;

    @Default
    private List<Adquirente> adquirentes = null;

    private Taxas taxas;

    @Default
    private List<Tarifa> tarifas = null;

    private DadosBancarios dadosBancarios;
}
