package br.com.mac.api.ajuste.financeiro.config;

import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import br.com.mac.api.ajuste.financeiro.Application;

@RunWith(JUnitPlatform.class)
@SpringBootTest(classes = {Application.class}, wemacvironment = SpringBootTest.Wemacvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
@ActiveProfiles("test")
public abstract class TemplateTest {
}
