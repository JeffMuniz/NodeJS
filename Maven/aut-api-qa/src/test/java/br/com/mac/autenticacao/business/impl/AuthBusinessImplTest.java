package br.com.mac.autenticacao.business.impl;

import br.com.mac.autenticacao.Application;
import br.com.mac.autenticacao.business.AuthBusiness;
import br.com.mac.autenticacao.exception.ErroInternoServidorException;
import java.util.Objects;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = Application.class)
@ActiveProfiles("test")
public class AuthBusinessImplTest {

  public static final String USUARIO = "qa@mac.com.br";
  public static final String SENHA = "789@mac";

  @Autowired
  private AuthBusiness authBusiness;

  @Test
  public void cenarioSucessoAutenticacao() throws VerificationException {
    AccessTokenResponse accessTokenResponse = authBusiness.autenticacao(USUARIO, SENHA);

    AccessTokenResponse autorizacao =
        authBusiness.autorizacao("Bearer " + accessTokenResponse.getToken());

    Assert.assertNotNull(autorizacao);
    Assert.assertEquals(accessTokenResponse.getToken(),
        Objects.requireNonNull(autorizacao.getToken()));
  }

  @Test
  public void cenarioFalhaAutenticacao() {
    AccessTokenResponse accessTokenResponse = authBusiness.autenticacao(USUARIO, SENHA);

    Assertions.assertThrows(ErroInternoServidorException.class,
        () -> authBusiness.autorizacao(accessTokenResponse.getToken()));
  }

  @Test
  public void cenarioPerfis() throws VerificationException {
    AccessTokenResponse accessTokenResponse = authBusiness.autenticacao(USUARIO, SENHA);

    AccessTokenResponse autorizacao =
        authBusiness.autorizacao("Bearer " + accessTokenResponse.getToken());

    authBusiness.perfis("Bearer " + accessTokenResponse.getToken());

    Assert.assertNotNull(autorizacao);
    Assert.assertEquals(accessTokenResponse.getToken(),
        Objects.requireNonNull(autorizacao.getToken()));
  }
}
