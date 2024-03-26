package br.com.machina.estautoecapi.integration.actions;

import br.com.machina.estautoecapi.bean.Endereco;
import br.com.machina.estautoecapi.bean.credenciamento.Adquirente;
import br.com.machina.estautoecapi.bean.credenciamento.DadosBancarios;
import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import br.com.machina.estautoecapi.bean.credenciamento.Estabelecimento;
import br.com.machina.estautoecapi.bean.credenciamento.Produto;
import br.com.machina.estautoecapi.bean.credenciamento.Proprietario;
import br.com.machina.estautoecapi.bean.credenciamento.QuestionarioPAT;
import br.com.machina.estautoecapi.bean.credenciamento.Tarifa;
import br.com.machina.estautoecapi.bean.credenciamento.Taxas;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.AreaAtendimento;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.LugaresEstabelecimento;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.NumeroCaixasRegistradoras;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.NumeroRefeicoesDiarias;
import com.github.javafaker.Faker;
import com.github.thiagonego.alfred.cnpj.CNPJ;
import com.github.thiagonego.alfred.cpf.CPF;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

import static br.com.machina.estautoecapi.bean.credenciamento.enums.NomeAdquirente.GETNET;
import static br.com.machina.estautoecapi.bean.credenciamento.enums.TipoProduto.VALE_REFEICAO;
import static io.restassured.RestAssured.given;

@Component
public class CredenciamentoActions {

    @Autowired
    Environment environment;

    Faker faker = new Faker(new Locale("pt-BR"));

    public DadosCredenciamento criarDadosEtabelecimento(){
        return DadosCredenciamento.builder()
                .estabelecimento(dadosEstabelecimento())
                .proprietario(gerarProprietario())
                .adquirentes(gerarAdquirentes())
                .produtos(gerarProdutos())
                .dadosBancarios(gerarDadosBancarios())
                .origem("")
                .questionarioPAT(gerarQuestionarioPAT())
                .tarifas(gerarTarifas())
                .taxas(gerarTaxas())
                .statusCredenciamento("Aprovado")
                .dataCriacao(LocalDate.now())
                .dataAtualizacao(LocalDate.now())
                .dataEnvio(LocalDate.now())
                .build();
    }

    public Estabelecimento dadosEstabelecimento(){
        return Estabelecimento.builder()
                .cnpj(CNPJ.gerar())
                .nomeFantasia(faker.company().name())
                .razaoSocial(faker.company().name())
                .endereco(gerarEnderecoEstabelecimento())
                .statusCadastro("")
                .telefone("4004-4474")
                .build();
    }

    public Endereco gerarEnderecoEstabelecimento() {
        return Endereco.builder()
                .logradouro("Rua Amador Bueno")
                .numero(474L)
                .complemento("1º Andar")
                .cep("04752-901")
                .bairro("Santo Amaro")
                .cidade("São Paulo")
                .uf("SP")
                .build();
    }

    public Proprietario gerarProprietario(){
        return Proprietario.builder()
                .cpf(CPF.gerar())
                .nome(faker.name().fullName())
                .email("bruno.rodrigues.ext@conductor.com.br")
                .telefone("4004-4474")
                .build();
    }

    public List<Adquirente> gerarAdquirentes(){
        List<Adquirente> adquirentes = new ArrayList<>();

         adquirentes.add(Adquirente.builder()
                 .nome(GETNET)
                 .numerosEstabelecimento(Collections.singletonList("0987654321"))
                 .build());

         return adquirentes;
    }

    public List<Produto> gerarProdutos(){
        List<Produto> produtos = new ArrayList<>();

        produtos.add(Produto.builder()
                .aceiteTermos(true)
                .tipo(VALE_REFEICAO)
                .build());

        return produtos;
    }

    public DadosBancarios gerarDadosBancarios(){
        return DadosBancarios.builder()
                .agencia("1234")
                .banco("33")
                .contaCorrente("4321")
                .digito("0")
                .build();
    }

    public QuestionarioPAT gerarQuestionarioPAT(){
        return QuestionarioPAT.builder()
                .areaAtendimento(AreaAtendimento.builder().min(1).max(100).build())
                .lugaresEstabelecimento(LugaresEstabelecimento.builder().min(1).max(100).build())
                .numeroCaixasRegistradoras(NumeroCaixasRegistradoras.builder().min(1).max(100).build())
                .numeroRefeicoesDiarias(NumeroRefeicoesDiarias.builder().min(1).max(100).build())
                .possuiFrutaCardapio(true)
                .build();
    }

    public List<Tarifa> gerarTarifas(){
        List<Tarifa> tarifas = new ArrayList<>();

        tarifas.add(Tarifa.builder()
                .tipo("TAX")
                .valor(0.6)
                .build());

        return tarifas;
    }

    public Taxas gerarTaxas(){
        return Taxas.builder()
                .mdr("teste")
                .build();
    }

    public Response cadastrarCredenciamento(String tipo, String cnpj, DadosCredenciamento body){
        Response response = null;
        RestAssured.port = Integer.parseInt(environment.getProperty("local.server.port"));
        response = given().contentType("application/json").when().get("/clientes/" + cnpj);
        return response;
    }
}
