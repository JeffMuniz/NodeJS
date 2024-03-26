package br.com.machina.estautoecapi.service;

import br.com.machina.adapter.rest.model.ResponseModel;
import br.com.machina.customexception.exception.BadRequestCustom;
import br.com.machina.customexception.exception.ExceptionCustom;
import br.com.machina.customexception.exception.UnauthorizedCustom;
import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import br.com.machina.estautoecapi.bean.PoliticaResponse;
import br.com.machina.estautoecapi.bean.ValidaPessoaFisicaRequest;
import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import br.com.machina.estautoecapi.port.MotorPoliticaPort;
import br.com.machina.estautoecapi.repository.DadosCredenciamentoRepository;
import br.com.machina.estautoecapi.repository.PessoaFisicaRepository;
import br.com.machina.estautoecapi.repository.PessoaJuridicaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static java.util.Objects.requireNonNull;

@Slf4j
@Service
public class MotorPoliticaService{

    @Autowired
    private FakeList fakeList;

    @Autowired
    private MotorPoliticaPort port;

    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;

    @Autowired
    private PessoaJuridicaRepository pessoaJuridicaRepository;

    @Autowired
    private DadosCredenciamentoRepository dadosCredenciamentoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public PoliticaResponse consultarPessoaJuridica(String cnpj) {
        PoliticaResponse pessoaJuridica = pessoaJuridicaRepository.findByCnpj(cnpj);
        if(pessoaJuridica != null)
            return pessoaJuridica;

        ResponseModel<PoliticaResponse> response = port.getEmpresas(cnpj);

        if (requireNonNull(HttpStatus.resolve(response.getStatusCode())).is2xxSuccessful() && nonNull(response.getData())) {
            pessoaJuridicaRepository.save(response.getData());
            return objectMapper.convertValue(response.getData(), PoliticaResponse.class);
        }
        throw new ExceptionCustom(HttpStatus.resolve(response.getStatusCode()), response.getMessage());
    }

    public PessoaFisicaResponse consultarPessoaFisica(String cpf) {
        ResponseModel<PessoaFisicaResponse> response = port.getPessoa(cpf);

        if (requireNonNull(HttpStatus.resolve(response.getStatusCode())).is2xxSuccessful())
            return objectMapper.convertValue(response.getData(), PessoaFisicaResponse.class);

        throw new ExceptionCustom(HttpStatus.resolve(response.getStatusCode()), response.getMessage());
    }

    public PessoaFisicaResponse consultarPessoaFisicaValidacao(final String cpf){
        PessoaFisicaResponse fisicaResponse = pessoaFisicaRepository.findByCpf(cpf);
        if (fisicaResponse != null)
            return fisicaResponse;

        fisicaResponse = consultarPessoaFisica(cpf);

        fisicaResponse.setNomes(fakeList.buildFakeListNomes(fisicaResponse.getSexo(), fisicaResponse.getNome()));
        fisicaResponse.setNomesMae(fakeList.buildFakeListNomesMae(fisicaResponse.getNomeMae()));
        fisicaResponse.setDatasNascimento(fakeList.buildFakeListDataNascimento(fisicaResponse.getDataNascimento()));
        fisicaResponse = pessoaFisicaRepository.save(fisicaResponse);

        fisicaResponse.ocultarValores();
        return fisicaResponse;
    }

    public void validarPessoa(String cnpj, ValidaPessoaFisicaRequest pessoaRequest) {
        if(isPessoaFisicaValida(pessoaRequest)) {
            String id = criaIdDadosCredenciamento(cnpj, pessoaRequest.getCpf());
            dadosCredenciamentoRepository.save(DadosCredenciamento.builder().id(id).build());
            return;
        }
        throw new BadRequestCustom("Erro na validação");
    }

    private Boolean isPessoaFisicaValida(ValidaPessoaFisicaRequest pessoaRequest) {
        PessoaFisicaResponse pessoa = pessoaFisicaRepository.findByCpf(pessoaRequest.getCpf());

        if (isNull(pessoa)) {
            return false;
        } else if (!isNull(pessoaRequest.getNome())) {
            return pessoaRequest.getNome().equals(pessoa.getNome());
        } else if (!isNull(pessoaRequest.getNomeMae())) {
            return pessoaRequest.getNomeMae().equals(pessoa.getNomeMae());
        } else if (!isNull(pessoaRequest.getDataNascimento())) {
            return pessoaRequest.getDataNascimento().equals(pessoa.getDataNascimento());
        }
        return false;
    }

    private String criaIdDadosCredenciamento(String cnpj, String cpf) {
        return cnpj + ":" + cpf;
    }
}
