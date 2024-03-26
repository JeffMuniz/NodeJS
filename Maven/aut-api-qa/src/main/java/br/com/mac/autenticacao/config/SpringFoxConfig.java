package br.com.mac.autenticacao.config;

import java.util.ArrayList;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SpringFoxConfig {

  @Value("${info.app.name}")
  public String name;

  @Value("${info.build.version}")
  public String version;

  /**
   * Cria documentação Swagger.
   *
   * @return instância de {@link Docket}
   */
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
        .select()
        .paths(PathSelectors.any())
        .apis(RequestHandlerSelectors.basePackage("br.com.mac.autenticacao"))
        .build()
        .apiInfo(apiInfo());
  }

  @NotNull
  private ApiInfo apiInfo() {
    return new ApiInfo(
        name,
        null,
        version,
        null,
        null,
        null,
        null,
        new ArrayList<>()
    );
  }
}
