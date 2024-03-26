package br.com.mac.autenticacao.business;

import br.com.mac.autenticacao.web.api.model.Perfil;
import br.com.mac.autenticacao.web.api.model.TokenDeAcesso;
import java.util.List;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessTokenResponse;

public interface AuthBusiness {

  AccessTokenResponse autenticacao(String username, String password);

  AccessTokenResponse autorizacao(String token) throws VerificationException;

  TokenDeAcesso tokenDeAcesso(String token) throws VerificationException;

  List<Perfil> perfis(String authorization) throws VerificationException;
}
