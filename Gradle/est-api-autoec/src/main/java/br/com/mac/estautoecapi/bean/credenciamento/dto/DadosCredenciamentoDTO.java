package br.com.machina.estautoecapi.bean.credenciamento.dto;

import br.com.machina.estautoecapi.bean.credenciamento.Adquirente;
import br.com.machina.estautoecapi.bean.credenciamento.DadosBancarios;
import br.com.machina.estautoecapi.bean.credenciamento.Estabelecimento;
import br.com.machina.estautoecapi.bean.credenciamento.Produto;
import br.com.machina.estautoecapi.bean.credenciamento.Proprietario;
import br.com.machina.estautoecapi.bean.credenciamento.QuestionarioPAT;
import br.com.machina.estautoecapi.bean.credenciamento.Tarifa;
import br.com.machina.estautoecapi.bean.credenciamento.Taxas;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class DadosCredenciamentoDTO {

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
