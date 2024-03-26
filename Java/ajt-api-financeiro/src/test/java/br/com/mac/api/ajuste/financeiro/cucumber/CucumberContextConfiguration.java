package br.com.mac.api.ajuste.financeiro.cucumber;

import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import br.com.mac.api.ajuste.financeiro.Application;
import io.cucumber.java.Before;

@SpringBootTest(wemacvironment = SpringBootTest.Wemacvironment.RANDOM_PORT)
@ContextConfiguration(classes = Application.class)
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
@ActiveProfiles("test")
public class CucumberContextConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(CucumberContextConfiguration.class);

    @Before
    public void setup_cucumber_spring_context() {

        LOGGER.info("-------------- Spring Context Initialized For Executing Cucumber Tests --------------");
    }

}
