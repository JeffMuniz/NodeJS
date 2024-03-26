package br.com.machina.estautoecapi.service;

import br.com.machina.customexception.exception.BadRequestCustom;
import br.com.machina.customexception.exception.NotFoundCustom;
import br.com.machina.estautoecapi.bean.credenciamento.DadosBancarios;
import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import br.com.machina.estautoecapi.bean.credenciamento.Estabelecimento;
import br.com.machina.estautoecapi.bean.credenciamento.Produto;
import br.com.machina.estautoecapi.bean.credenciamento.QuestionarioPAT;
import br.com.machina.estautoecapi.bean.credenciamento.Tarifa;
import br.com.machina.estautoecapi.bean.credenciamento.enums.TipoProduto;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.AreaAtendimento;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.LugaresEstabelecimento;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.NumeroCaixasRegistradoras;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.NumeroRefeicoesDiarias;
import br.com.machina.estautoecapi.repository.DadosCredenciamentoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.beanvalidation.CustomValidatorBean;

import java.time.LocalDate;
import java.util.Objects;

import static br.com.machina.estautoecapi.bean.credenciamento.enums.TipoProduto.VALE_ALIMENTACAO;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Component
public class CredenciamentoService {

    @Autowired
    private MotorPoliticaService service;

    @Autowired
    private DadosCredenciamentoRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CustomValidatorBean validator;

    public DadosCredenciamento salvar(DadosCredenciamento dadosCredenciamento) {
        DadosCredenciamento dados = repository.findDadosCredenciamentoByEstabelecimento_Cnpj(dadosCredenciamento.getEstabelecimento().getCnpj());

        if (dados != null)
            throw new BadRequestCustom("");

        dadosCredenciamento.setDataCriacao(LocalDate.now());

        return repository.save(dadosCredenciamento);
    }

    public DadosCredenciamento atualizar(String id, DadosCredenciamento dadosCredenciamento) {
        if (Objects.nonNull(dadosCredenciamento.getEstabelecimento()))
            throw new BadRequestCustom("Estabelecimento cannot be null");

        DadosCredenciamento oldDadosCredenciamento = repository.findById(id).orElseThrow(() -> new NotFoundCustom("Recurso não encontrado"));

        if (Objects.nonNull(dadosCredenciamento.getProprietario()))
            oldDadosCredenciamento.setProprietario(dadosCredenciamento.getProprietario());

        if (Objects.nonNull(dadosCredenciamento.getEstabelecimento()))
            atualizarEstabelecimento(oldDadosCredenciamento.getEstabelecimento(), dadosCredenciamento.getEstabelecimento());

        if (Objects.nonNull(dadosCredenciamento.getDadosBancarios())) {
            DadosBancarios.validar(dadosCredenciamento.getDadosBancarios());
            oldDadosCredenciamento.setDadosBancarios(dadosCredenciamento.getDadosBancarios());
        }
        if (Objects.nonNull(dadosCredenciamento.getProdutos())) {
            dadosCredenciamento.getProdutos().forEach(Produto::validar);
            oldDadosCredenciamento.setProdutos(dadosCredenciamento.getProdutos());
        }
        if (Objects.nonNull(dadosCredenciamento.getAdquirentes()))
//            dadosCredenciamento.getAdquirentes().forEach(Adquirente::validar);
            oldDadosCredenciamento.setAdquirentes(dadosCredenciamento.getAdquirentes());

        if (Objects.nonNull(dadosCredenciamento.getTarifas())) {
            dadosCredenciamento.getTarifas().forEach(Tarifa::validar);
            oldDadosCredenciamento.setTarifas(dadosCredenciamento.getTarifas());
        }

        if (Objects.nonNull(dadosCredenciamento.getQuestionarioPAT())) {
            validaQuestionarioPAT(dadosCredenciamento);
            oldDadosCredenciamento.setQuestionarioPAT(dadosCredenciamento.getQuestionarioPAT());
        }

        oldDadosCredenciamento.setDataAtualizacao(LocalDate.now());

        repository.save(oldDadosCredenciamento);

        return dadosCredenciamento;
    }

    private void validaQuestionarioPAT(DadosCredenciamento dadosCredenciamento) {
        if (isNull(dadosCredenciamento.getQuestionarioPAT()))
            return;

        if(isNull(dadosCredenciamento.getProdutos()) || dadosCredenciamento.getProdutos().isEmpty())
            throw new BadRequestCustom("Questionario PAT sem produtos");

        dadosCredenciamento.getProdutos()
                .forEach(d -> isValid(d.getTipo(), dadosCredenciamento.getQuestionarioPAT()));
    }

    public void isValid(TipoProduto tipoProduto, QuestionarioPAT questionarioPAT) {
        validator.validate(questionarioPAT, new BeanPropertyBindingResult(questionarioPAT, QuestionarioPAT.class.getName()));

        if (VALE_ALIMENTACAO == tipoProduto && nonNull(questionarioPAT.getNumeroCaixasRegistradoras()))
            validator.validate(questionarioPAT.getNumeroRefeicoesDiarias(), new BeanPropertyBindingResult(questionarioPAT.getNumeroRefeicoesDiarias(), NumeroRefeicoesDiarias.class.getName()));

        validator.validate(questionarioPAT.getLugaresEstabelecimento(), new BeanPropertyBindingResult(questionarioPAT.getLugaresEstabelecimento(), LugaresEstabelecimento.class.getName()));
        validator.validate(questionarioPAT.getAreaAtendimento(), new BeanPropertyBindingResult(questionarioPAT.getAreaAtendimento(), AreaAtendimento.class.getName()));
        validator.validate(questionarioPAT.getPossuiFrutaCardapio(), new BeanPropertyBindingResult(questionarioPAT.getPossuiFrutaCardapio(), Boolean.class.getName()));
        validator.validate(questionarioPAT.getNumeroCaixasRegistradoras(), new BeanPropertyBindingResult(questionarioPAT.getNumeroCaixasRegistradoras(), NumeroCaixasRegistradoras.class.getName()));
    }

    private boolean isValidoQuestionario(QuestionarioPAT questionarioPAT) {

        return isNull(questionarioPAT.getNumeroRefeicoesDiarias())
                || isNull(questionarioPAT.getAreaAtendimento())
                || isNull(questionarioPAT.getPossuiFrutaCardapio())
                || isNull(questionarioPAT.getLugaresEstabelecimento());
    }

    private Estabelecimento atualizarEstabelecimento(Estabelecimento oldDadosCredenciamento, Estabelecimento dadosCredenciamento) {
        if (Objects.nonNull(dadosCredenciamento.getCnpj()))
            oldDadosCredenciamento.setCnpj(dadosCredenciamento.getCnpj());

        if (Objects.nonNull(dadosCredenciamento.getNomeFantasia()))
            oldDadosCredenciamento.setNomeFantasia(dadosCredenciamento.getNomeFantasia());

        if (Objects.nonNull(dadosCredenciamento.getRazaoSocial()))
            oldDadosCredenciamento.setRazaoSocial(dadosCredenciamento.getRazaoSocial());

        if (Objects.nonNull(dadosCredenciamento.getTelefone()))
            oldDadosCredenciamento.setTelefone(dadosCredenciamento.getTelefone());

        if (Objects.nonNull(dadosCredenciamento.getEndereco()))
            oldDadosCredenciamento.setEndereco(dadosCredenciamento.getEndereco());

        return oldDadosCredenciamento;
    }
}
