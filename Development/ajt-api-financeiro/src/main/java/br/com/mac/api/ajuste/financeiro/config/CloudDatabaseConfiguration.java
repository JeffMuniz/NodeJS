package br.com.mac.api.ajuste.financeiro.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile(ApplicationConstants.SPRING_PROFILE_CLOUD)
public class CloudDatabaseConfiguration extends AbstractCloudConfig {

    private static final String CLOUD_CONFIGURATION_HIKARI_PREFIX = "spring.datasource.hikari";
    private final Logger logger = LoggerFactory.getLogger(CloudDatabaseConfiguration.class);

    @Bean
    @ConfigurationProperties(CLOUD_CONFIGURATION_HIKARI_PREFIX)
    public DataSource dataSource() {
        logger.info("Configuring JDBC datasource from a cloud provider");
        return connectionFactory().dataSource();
    }
}
