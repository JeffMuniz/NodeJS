package br.com.machina.estautoecapi.api;

import br.com.machina.estautoecapi.bean.TokenRequest;
import br.com.machina.estautoecapi.bean.TokenUpdate;
import br.com.machina.estautoecapi.port.TokenPierRest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/token")
public class TokenApi implements TokenApiDefinition {

    @Autowired
    private TokenPierRest service;

    @PostMapping
    public ResponseEntity<Object> enviaToken(@RequestBody TokenRequest token) {
        HttpStatus response = service.gerarToken(token);
        return ResponseEntity.status(response).build();
    }

    @PatchMapping
    public ResponseEntity<Object> validaToken(@RequestBody TokenUpdate token) {
        HttpStatus response = service.validarToken(token);
        return ResponseEntity.status(response).build();
    }
}
