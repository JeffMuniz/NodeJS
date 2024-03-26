package br.com.machina.estautoecapi.integration.steps;

import br.com.machina.estautoecapi.integration.actions.CredenciamentoActions;
import br.com.machina.estautoecapi.integration.conf.CucumberTestContextConfiguration;
import br.com.machina.estautoecapi.integration.service.CredenciamentoTestService;
import io.cucumber.java.pt.Dado;
import io.cucumber.java.pt.E;
import io.cucumber.java.pt.Quando;
import org.springframework.beans.factory.annotation.Autowired;

public class CredenciamentoStep extends CucumberTestContextConfiguration {

    @Autowired
    CredenciamentoTestService credenciamentoTestService;

    @Autowired
    CredenciamentoActions actions;

    @Dado("Tenha os dados do estabelecimento para salvar")
    public void tenha_os_dados_do_estabelecimento_para_salvar() {
        credenciamentoTestService.dadosCredenciamento = actions.criarDadosEtabelecimento();
    }

    @E("Os dados do estabelecimento estejam inválidos")
    public void osDadosDoEstabelecimentoEstejamInválidos() {
        System.err.println("Os dados do estabelecimento estejam inválidos");

    }

    @Quando("Chamar o serviço POST para salvar registro")
    public void chamar_o_serviço_post_para_salvar_registro() {
        System.err.println("Chamar o serviço POST para salvar registro");
    }

    @Quando("Chamar o serviço {string} para salvar registro")
    public void chamar_o_serviço_para_salvar_registro(String tipo) {
        System.err.println(tipo);
        actions.cadastrarCredenciamento(tipo, credenciamentoTestService.dadosCredenciamento.getEstabelecimento().getCnpj(), credenciamentoTestService.dadosCredenciamento);
    }
}
