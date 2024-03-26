package br.com.mac.autenticacao.web.api;

import br.com.mac.autenticacao.business.AuthBusiness;
import br.com.mac.autenticacao.exception.NaoAutorizadoErroException;
import br.com.mac.autenticacao.web.api.model.Perfil;
import br.com.mac.autenticacao.web.api.model.TokenDeAcesso;
import java.util.List;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SegurancaApiDelegateImpl implements SegurancaApiDelegate {

  public static final String ACCESS_TOKEN = "ACCESS_TOKEN";
  private final AuthBusiness authBusiness;

  public SegurancaApiDelegateImpl(AuthBusiness authBusiness) {
    this.authBusiness = authBusiness;
  }

  @Override
  public ResponseEntity<TokenDeAcesso> autenticacao(String usuario,
                                                    String senha) {

    try {
      AccessTokenResponse accessTokenResponse = authBusiness.autenticacao(usuario, senha);

      HttpHeaders headers = new HttpHeaders();
      headers.set(ACCESS_TOKEN, accessTokenResponse.getToken());

      return new ResponseEntity<>(authBusiness.tokenDeAcesso(accessTokenResponse.getToken()),
          headers, HttpStatus.OK);
    } catch (VerificationException e) {
      throw new NaoAutorizadoErroException(e.getMessage());
    }
  }

  @Override
  public ResponseEntity<TokenDeAcesso> autorizacao(String token) {

    try {
      AccessTokenResponse accessTokenResponse = authBusiness.autorizacao(token);

      HttpHeaders headers = new HttpHeaders();
      headers.set(ACCESS_TOKEN, accessTokenResponse.getToken());

      return new ResponseEntity<>(authBusiness.tokenDeAcesso(accessTokenResponse.getToken()),
          headers, HttpStatus.OK);
    } catch (Exception ex) {
      throw new NaoAutorizadoErroException(ex.getMessage());
    }
  }

  @Override
  public ResponseEntity<List<Perfil>> segurancaPerfisGet(String authorization) {
    try {
      AccessTokenResponse accessTokenResponse = authBusiness.autorizacao(authorization);

      HttpHeaders headers = new HttpHeaders();
      headers.set(ACCESS_TOKEN, accessTokenResponse.getToken());

      return new ResponseEntity<>(authBusiness.perfis(authorization), headers, HttpStatus.OK);
    } catch (VerificationException e) {
      throw new NaoAutorizadoErroException(e.getMessage());
    }
  }
}
