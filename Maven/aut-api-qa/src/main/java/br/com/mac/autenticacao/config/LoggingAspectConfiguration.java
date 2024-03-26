package br.com.mac.autenticacao.config;

import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.JestResult;
import io.searchbox.client.config.HttpClientConfig;
import io.searchbox.indices.CreateIndex;
import io.searchbox.indices.IndicesExists;
import java.io.IOException;
import java.net.URI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.util.UriComponentsBuilder;

@Configuration
@EnableAspectJAutoProxy
public class LoggingAspectConfiguration {

  private final Logger logger = LoggerFactory.getLogger(LoggingAspectConfiguration.class);
  @Value("${integration.elasticsearch.active}")
  private Boolean integrationElasticsearchActive;
  @Value("${integration.elasticsearch.endpoint}")
  private String integrationElasticsearchEndpoint;
  @Value("${integration.elasticsearch.index}")
  private String integrationElasticsearchIndex;

  /**
   * Criar uma instância de {@link JestClient}.
   *
   * @return uma instância de {@link JestClient}
   */
  @Bean
  public JestClient jestClient() {
    if (Boolean.TRUE.equals(integrationElasticsearchActive)) {
      String url = UriComponentsBuilder.newInstance()
          .uri(URI.create(integrationElasticsearchEndpoint))
          .build()
          .toUriString();

      JestClientFactory factory = new JestClientFactory();
      factory.setHttpClientConfig(
          new HttpClientConfig.Builder(url)
              .multiThreaded(true)
              .defaultMaxTotalConnectionPerRoute(2)
              .maxTotalConnection(10)
              .build());
      JestClient jestClient = factory.getObject();

      JestResult jestResult;
      try {
        jestResult =
            jestClient.execute(new IndicesExists.Builder(integrationElasticsearchIndex).build());

        if (!jestResult.isSucceeded()) {
          jestResult =
              jestClient.execute(new CreateIndex.Builder(integrationElasticsearchIndex).build());
          if (jestResult.isSucceeded()) {
            logger.info("Índice criado com sucesso.");
          }
        }
      } catch (IOException ex) {
        logger.error("Erro ao criar jestClient", ex);
      }
      return jestClient;
    }
    return null;
  }
}
