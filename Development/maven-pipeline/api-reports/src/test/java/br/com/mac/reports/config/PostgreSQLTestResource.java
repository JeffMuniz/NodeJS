package br.com.mac.reports.config;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class PostgreSQLTestResource implements QuarkusTestResourceLifecycleManager {

    private static final PostgreSQLContainer<?> DATABASE = new PostgreSQLContainer<>()
            .withStartupTimeout(Duration.ofMinutes(5))
            .withLogConsumer(new Slf4jLogConsumer(LoggerFactory.getLogger(PostgreSQLTestResource.class)));

    @Override
    public Map<String, String> start() {
        log.info("Inicializando o docker");
        DATABASE.start();
        return config();
    }

    private Map<String, String> config() {
        Map<String, String> config = new HashMap<>();
        config.put("quarkus.datasource.jdbc.url", DATABASE.getJdbcUrl());
        config.put("quarkus.datasource.username", DATABASE.getUsername());
        config.put("quarkus.datasource.password", DATABASE.getPassword());

        log.info("Propriedades: {}", config);
        return config;
    }

    @Override
    public void stop() {
        if (DATABASE != null) {
            DATABASE.stop();
        }
    }
}
