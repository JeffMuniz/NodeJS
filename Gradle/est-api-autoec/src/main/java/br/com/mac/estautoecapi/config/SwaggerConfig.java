package br.com.machina.estautoecapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class SwaggerConfig {

    @Value("${info.app.name}")
    private String title;

    @Value("${info.app.description}")
    private String description;

    @Value("${info.build.version}")
    private String version;

    @Bean
    public GroupedOpenApi autoEcOpenApi(){
        String packagesToScan[] = {"br.com.machina.estautoecapi.api"};
        return GroupedOpenApi.builder().group("est-autoec-api").packagesToScan(packagesToScan).build();
    }

    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI().info(new Info()
                .title(title)
                .description(description)
                .version(version));
    }
}
