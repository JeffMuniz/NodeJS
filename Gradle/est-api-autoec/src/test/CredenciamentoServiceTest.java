package br.com.machina.estautoecapi.service;

import br.com.machina.customexception.exception.BadRequestCustom;
import br.com.machina.customexception.exception.NotFoundCustom;
import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import br.com.machina.estautoecapi.bean.credenciamento.Estabelecimento;
import br.com.machina.estautoecapi.repository.DadosCredenciamentoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Optional;

@RunWith(MockitoJUnitRunner.class)
public class CredenciamentoService {

    @Autowired
    private CredenciamentoService credenciamentoService;

    @InjectMocks
    private MotorPoliticaService service;

    @InjectMocks
    private DadosCredenciamentoRepository repository;

    @InjectMocks
    private ObjectMapper objectMapper;

    @Test
    public DadosCredenciamento testSalvar(DadosCredenciamento dadosCredenciamento) {
        dadosCredenciamento.setDataCriacao(LocalDate.now());

        return repository.save(dadosCredenciamento);
    }

    public DadosCredenciamento atualizar(DadosCredenciamento dadosCredenciamento) {
        if (Objects.isNull(dadosCredenciamento.getId())) {
            throw new BadRequestCustom("Bad Request");
        }

        Optional<DadosCredenciamento> optionalDadosCredenciamento = repository.findById(dadosCredenciamento.getId());

        DadosCredenciamento oldDadosCredenciamento =
                optionalDadosCredenciamento.orElseThrow(() -> new NotFoundCustom("Recurso não encontrado"));

        if (Objects.nonNull(dadosCredenciamento.getProprietario()))
            oldDadosCredenciamento.setProprietario(dadosCredenciamento.getProprietario());

        if (Objects.nonNull(dadosCredenciamento.getEstabelecimento()))
            atualizarEstabelecimento(oldDadosCredenciamento.getEstabelecimento(), dadosCredenciamento.getEstabelecimento());

        if (Objects.nonNull(dadosCredenciamento.getDadosBancarios()))
            oldDadosCredenciamento.setDadosBancarios(dadosCredenciamento.getDadosBancarios());

        if (Objects.nonNull(dadosCredenciamento.getProdutos()))
            oldDadosCredenciamento.setProdutos(dadosCredenciamento.getProdutos());

        if (Objects.nonNull(dadosCredenciamento.getAdquirentes()))
            oldDadosCredenciamento.setAdquirentes(dadosCredenciamento.getAdquirentes());

        if (Objects.nonNull(dadosCredenciamento.getTarifas()))
            oldDadosCredenciamento.setTarifas(dadosCredenciamento.getTarifas());

        oldDadosCredenciamento.setDataAtualizacao(LocalDate.now());

        repository.save(oldDadosCredenciamento);

        return dadosCredenciamento;
    }

    private Estabelecimento atualizarEstabelecimento(Estabelecimento oldDadosCredenciamento, Estabelecimento dadosCredenciamento) {

        if (Objects.nonNull(dadosCredenciamento.getCnpj()))
            oldDadosCredenciamento.setCnpj(dadosCredenciamento.getCnpj());

        if (Objects.nonNull(dadosCredenciamento.getNomeFantasia()))
            oldDadosCredenciamento.setCnpj(dadosCredenciamento.getCnpj());

        if (Objects.nonNull(dadosCredenciamento.getRazaoSocial()))
            oldDadosCredenciamento.setCnpj(dadosCredenciamento.getCnpj());

        if (Objects.nonNull(dadosCredenciamento.getStatusCadastro()))
            oldDadosCredenciamento.setCnpj(dadosCredenciamento.getCnpj());

        if (Objects.nonNull(dadosCredenciamento.getTelefone()))
            oldDadosCredenciamento.setCnpj(dadosCredenciamento.getCnpj());

        if (Objects.nonNull(dadosCredenciamento.getEndereco()))
            oldDadosCredenciamento.setEndereco(dadosCredenciamento.getEndereco());

        return oldDadosCredenciamento;
    }
}
