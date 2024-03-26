package br.com.mac.api.ajuste.financeiro.util;

import org.springframework.boot.SpringApplication;

import java.util.HashMap;
import java.util.Map;

/**
 * Classe ProfileUtil - configuracao do perfil padrao utilizado na aplicacao
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
public final class ProfileUtil {

    private static final String SPRING_PROFILE_DEFAULT = "spring.profiles.default";

    /**
     * Atribui o perfil padrao da aplicacao
     * @param app - Spring application.
     */
    public static void perfilPadrao(SpringApplication app) {
        Map<String, Object> defProperties = new HashMap<>();
        defProperties.put(SPRING_PROFILE_DEFAULT, "dev");
        app.setDefaultProperties(defProperties);
    }
}
