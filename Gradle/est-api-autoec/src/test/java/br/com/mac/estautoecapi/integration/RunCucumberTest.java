package br.com.machina.estautoecapi.integration;

import br.com.machina.estautoecapi.integration.conf.CucumberTestContextConfiguration;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@CucumberOptions(
        features = { "src/test/resources/features" },
        tags = "@salvar",
        glue = { "br.com.machina.estautoecapi.integration"},
        plugin = { "de.monochromata.cucumber.report.PrettyReports:target/cucumber" })
@RunWith(Cucumber.class)
public class RunCucumberTest extends CucumberTestContextConfiguration {
}
