package br.com.mac.autenticacao.cucumber;

import br.com.mac.autenticacao.Application;
import io.cucumber.java.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ContextConfiguration(classes = Application.class)
@ActiveProfiles("test")
public class CucumberContextConfiguration {

  private static final Logger LOGGER = LoggerFactory.getLogger(CucumberContextConfiguration.class);

  /**
   * Inicializa o contexto para teste de integração com cucumber.
   */
  @Before
  public void setup_cucumber_spring_context() {

    LOGGER.info(
        "-------------- Spring Context Initialized For Executing Cucumber Tests --------------");
  }

}
