package br.com.machina.estautoecapi.api;

import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import br.com.machina.estautoecapi.bean.PoliticaResponse;
import br.com.machina.estautoecapi.bean.ValidaPessoaFisicaRequest;
import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import br.com.machina.estautoecapi.bean.credenciamento.dto.DadosCredenciamentoDTO;
import br.com.machina.estautoecapi.service.CredenciamentoService;
import br.com.machina.estautoecapi.service.MotorPoliticaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/clientes/")
public class CredenciamentoApi implements CredenciamentoApiDefinition {

    @Autowired
    private MotorPoliticaService motorPoliticaService;

    @Autowired
    private CredenciamentoService credenciamentoService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("{cnpj}")
    public ResponseEntity<PoliticaResponse> getPessoaJuridica(@PathVariable String cnpj) {
        return ResponseEntity.ok(motorPoliticaService.consultarPessoaJuridica(cnpj));
    }

    @GetMapping("{cnpj}/socios/{cpf}/validar")
    public ResponseEntity<PessoaFisicaResponse> getPessoaFisicaValidacao(@PathVariable String cnpj, @PathVariable String cpf) {
        return ResponseEntity.ok(motorPoliticaService.consultarPessoaFisicaValidacao(cpf));
    }

    @PostMapping("{cnpj}/socios/{cpf}/validar")
    public ResponseEntity<Void> validarPessoa(@PathVariable String cnpj, @PathVariable String cpf, @RequestBody ValidaPessoaFisicaRequest pessoaRequest) {
        pessoaRequest.setCpf(cpf);

        motorPoliticaService.validarPessoa(cnpj, pessoaRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{id}")
    public ResponseEntity<DadosCredenciamentoDTO> atualizarCredenciamento(@PathVariable String id, @RequestBody DadosCredenciamentoDTO dadosCredenciamento) {
        return ResponseEntity.ok(objectMapper.convertValue(credenciamentoService.atualizar(id, objectMapper.convertValue(dadosCredenciamento, DadosCredenciamento.class)), DadosCredenciamentoDTO.class));
    }
}
