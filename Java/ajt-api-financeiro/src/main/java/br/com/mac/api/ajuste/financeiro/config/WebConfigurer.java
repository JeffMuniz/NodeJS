package br.com.mac.api.ajuste.financeiro.config;

import java.util.Collections;

import javax.servlet.ServletContext;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Classe WebConfig - configuracao da aplicacao
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Configuration
public class WebConfigurer implements ServletContextInitializer {

    private final Logger logger = LoggerFactory.getLogger(WebConfigurer.class);
    private final Environment env;

    public WebConfigurer(Environment env) {
        this.env = env;
    }

    @Override
    public void onStartup(@NotNull ServletContext servletContext) {
        if (env.getActiveProfiles().length != 0) {
            logger.info("Web application configuration, using profiles: {}", env.getActiveProfiles());
        }
        logger.info("Web application fully configured");
    }

    @NotNull
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Collections.singletonList("*"));
        config.addAllowedMethod(HttpMethod.POST);
        config.addAllowedMethod(HttpMethod.PUT);
        config.addAllowedMethod(HttpMethod.DELETE);
        config.addAllowedMethod(HttpMethod.OPTIONS);
        config.addAllowedMethod(HttpMethod.PATCH);
        config.setAllowCredentials(false);
        config.setAllowedOrigins(Collections.singletonList("*"));
        config.setMaxAge(3600L);

        logger.debug("Registering CORS filter");
        source.registerCorsConfiguration("/api/**", config);
        source.registerCorsConfiguration("/management/**", config);
        source.registerCorsConfiguration("/v2/api-docs", config);

        return new CorsFilter(source);
    }
}
