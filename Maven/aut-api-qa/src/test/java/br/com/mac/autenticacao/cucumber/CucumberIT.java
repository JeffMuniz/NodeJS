package br.com.mac.autenticacao.cucumber;

import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(CucumberReportRunner.class)
@CucumberOptions(plugin = {"pretty",
    "json:target/cucumber-report.json"}, features = "src/test/features")
public class CucumberIT {

}
