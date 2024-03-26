package br.com.mac.autenticacao.web.api;

import br.com.mac.autenticacao.Application;
import br.com.mac.autenticacao.exception.NaoAutorizadoErroException;
import br.com.mac.autenticacao.web.api.model.TokenDeAcesso;
import java.util.Objects;
import javax.ws.rs.NotAuthorizedException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;


@SpringBootTest(classes = Application.class)
@ActiveProfiles("test")
class SegurancaApiDelegateImplTest {

  public static final String USUARIO = "qa@mac.com.br";
  public static final String SENHA = "789@mac";
  public static final String ACCESS_TOKEN = "ACCESS_TOKEN";

  @Autowired
  private SegurancaApiDelegateImpl segurancaApiDelegate;

  @Test
  void autenticacao1() {
    ResponseEntity<TokenDeAcesso> autenticacao = segurancaApiDelegate.autenticacao(USUARIO, SENHA);
    Assertions.assertThat(autenticacao).isNotNull();
  }

  @Test
  void autenticacao2() {
    Assertions.assertThatThrownBy(() -> segurancaApiDelegate.autenticacao(USUARIO, SENHA + 1))
        .isInstanceOf(NotAuthorizedException.class);
  }

  @Test
  void autorizacao1() {
    ResponseEntity<TokenDeAcesso> autenticacao = segurancaApiDelegate.autenticacao(USUARIO, SENHA);

    Assertions.assertThat(autenticacao).isNotNull();

    Assertions.assertThat(autenticacao.getHeaders()).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().containsKey(ACCESS_TOKEN)).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().get(ACCESS_TOKEN)).isNotNull();
    Assertions
        .assertThat(Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).size())
        .isOne();

    String accessToken = Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).get(0);

    Assertions.assertThat(accessToken).isNotNull();

    ResponseEntity<TokenDeAcesso> autorizacao =
        segurancaApiDelegate.autorizacao("Bearer " + accessToken);

    Assertions.assertThat(autorizacao).isNotNull();
  }

  @Test
  void autorizacao2() {
    ResponseEntity<TokenDeAcesso> autenticacao = segurancaApiDelegate.autenticacao(USUARIO, SENHA);

    Assertions.assertThat(autenticacao).isNotNull();

    Assertions.assertThat(autenticacao.getHeaders()).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().containsKey(ACCESS_TOKEN)).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().get(ACCESS_TOKEN)).isNotNull();
    Assertions
        .assertThat(Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).size())
        .isOne();

    String accessToken = Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).get(0);

    Assertions.assertThat(accessToken).isNotNull();

    Assertions.assertThatThrownBy(() -> segurancaApiDelegate.autorizacao(accessToken))
        .isInstanceOf(NaoAutorizadoErroException.class);
  }

  @Test
  void segurancaPerfisGet1() {
    ResponseEntity<TokenDeAcesso> autenticacao = segurancaApiDelegate.autenticacao(USUARIO, SENHA);

    Assertions.assertThat(autenticacao).isNotNull();

    Assertions.assertThat(autenticacao.getHeaders()).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().containsKey(ACCESS_TOKEN)).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().get(ACCESS_TOKEN)).isNotNull();
    Assertions
        .assertThat(Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).size())
        .isOne();

    String accessToken = Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).get(0);

    segurancaApiDelegate.segurancaPerfisGet("Bearer " + accessToken);
  }

  @Test
  void segurancaPerfisGet2() {
    ResponseEntity<TokenDeAcesso> autenticacao = segurancaApiDelegate.autenticacao(USUARIO, SENHA);

    Assertions.assertThat(autenticacao).isNotNull();

    Assertions.assertThat(autenticacao.getHeaders()).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().containsKey(ACCESS_TOKEN)).isNotNull();
    Assertions.assertThat(autenticacao.getHeaders().get(ACCESS_TOKEN)).isNotNull();
    Assertions
        .assertThat(Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).size())
        .isOne();

    String accessToken = Objects.requireNonNull(autenticacao.getHeaders().get(ACCESS_TOKEN)).get(0);

    Assertions.assertThatThrownBy(() -> segurancaApiDelegate.autorizacao(accessToken))
        .isInstanceOf(NaoAutorizadoErroException.class);
  }
}
