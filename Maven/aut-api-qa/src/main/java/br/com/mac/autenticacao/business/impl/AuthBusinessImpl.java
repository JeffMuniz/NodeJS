package br.com.mac.autenticacao.business.impl;

import br.com.mac.autenticacao.business.AuthBusiness;
import br.com.mac.autenticacao.exception.ErroInternoServidorException;
import br.com.mac.autenticacao.exception.NaoAutorizadoErroException;
import br.com.mac.autenticacao.web.api.model.Perfil;
import br.com.mac.autenticacao.web.api.model.TokenDeAcesso;
import java.util.List;
import java.util.stream.Collectors;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.TokenVerifier;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.common.VerificationException;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.keycloak.util.TokenUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthBusinessImpl implements AuthBusiness {

  @Value("${keycloak.realm}")
  private String realm;

  @Value("${keycloak.auth-url}")
  private String authUrl;

  @Value("${keycloak.client.id}")
  private String clientId;

  @Value("${keycloak.client.secret}")
  private String clientSecret;

  @Value("${keycloak.admin-username}")
  private String adminUsername;

  @Value("${keycloak.admin-password}")
  private String adminPassword;

  @Override
  public AccessTokenResponse autenticacao(String username, String password) {
    Keycloak keycloak = KeycloakBuilder.builder()
        .serverUrl(authUrl)
        .realm(realm)
        .username(username)
        .password(password)
        .clientId(clientId)
        .clientSecret(clientSecret)
        .grantType(OAuth2Constants.PASSWORD)
        .resteasyClient(
            new ResteasyClientBuilder()
                .connectionPoolSize(10).build()
        ).build();
    return keycloak.tokenManager().getAccessToken();
  }

  @Override
  public AccessTokenResponse autorizacao(String token) throws VerificationException {
    if (!token.contains(TokenUtil.TOKEN_TYPE_BEARER)) {
      throw new ErroInternoServidorException();
    }

    token = token.replace(TokenUtil.TOKEN_TYPE_BEARER, "").trim();

    TokenVerifier<AccessToken> verifier =
        TokenVerifier.create(token, AccessToken.class).withDefaultChecks();
    AccessToken accessToken = verifier.getToken();

    if (accessToken.isExpired()) {
      throw new NaoAutorizadoErroException();
    }

    AccessTokenResponse accessTokenResponse = new AccessTokenResponse();
    accessTokenResponse.setToken(token);

    return accessTokenResponse;
  }

  @Override
  public TokenDeAcesso tokenDeAcesso(String token) throws VerificationException {
    Keycloak keycloak = KeycloakBuilder.builder()
        .serverUrl(authUrl)
        .realm("master")
        .username(adminUsername)
        .password(adminPassword)
        .clientId("admin-cli")
        .resteasyClient(
            new ResteasyClientBuilder()
                .connectionPoolSize(10).build()
        ).build();

    TokenVerifier<AccessToken> verifier =
        TokenVerifier.create(token, AccessToken.class).withDefaultChecks();
    AccessToken accessToken = verifier.getToken();

    List<UserRepresentation> userRepresentations =
        keycloak.realm(realm).users().search(accessToken.getPreferredUsername());

    UserRepresentation userRepresentation = userRepresentations.get(0);
    UserResource userResource = keycloak.realm(realm).users().get(userRepresentation.getId());
    List<String> groups = userResource.groups().stream()
        .map(GroupRepresentation::getName)
        .collect(Collectors.toList());

    List<String> roles = userResource.roles()
        .realmLevel().listEffective().stream().map(RoleRepresentation::getName)
        .collect(Collectors.toList());

    return new TokenDeAcesso()
        .nome(userRepresentation.getFirstName() + " " + userRepresentation.getLastName())
        .permissoes(roles)
        .usuario(accessToken.getPreferredUsername())
        .grupos(groups)
        .email(accessToken.getEmail());
  }

  @Override
  public List<Perfil> perfis(String authorization) throws VerificationException {
    autorizacao(authorization);

    Keycloak keycloak = KeycloakBuilder.builder()
        .serverUrl(authUrl)
        .realm("master")
        .username(adminUsername)
        .password(adminPassword)
        .clientId("admin-cli")
        .resteasyClient(
            new ResteasyClientBuilder()
                .connectionPoolSize(10).build()
        ).build();

    return keycloak.realm(realm).groups().groups()
        .stream()
        .map(groupRepresentation -> new Perfil().nome(groupRepresentation.getName())
            .id(groupRepresentation.getId()))
        .filter(perfil -> !perfil.getNome().contains("macnuda"))
        .collect(Collectors.toList());
  }
}
