package br.com.mac.autenticacao.cucumber;

import io.cucumber.junit.Cucumber;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.junit.runner.notification.RunNotifier;
import org.junit.runners.model.InitializationError;
import org.springframework.beans.factory.annotation.Value;

public class CucumberReportRunner extends Cucumber {

  @Value("${info.app.name}")
  public static String projectName;

  @Value("${info.build.version}")
  public static String buildNumber;

  public CucumberReportRunner(Class clazz) throws InitializationError {
    super(clazz);
  }

  @Override
  public void run(RunNotifier notifier) {
    super.run(notifier);
    generateReport();
  }

  /**
   * Gera relatório de teste de integração com BDD.
   */
  public static void generateReport() {

    File reportOutputDirectory = new File("target/classes/static");
    List<String> jsonFiles = new ArrayList<>();
    jsonFiles.add("target/cucumber-report.json");

    // set values from respective build tool
    Configuration configuration = new Configuration(reportOutputDirectory, projectName);
    configuration.setBuildNumber(buildNumber);
    configuration.addClassifications("Build Number", buildNumber);
    configuration.addClassifications("Branch Name", getCurrentGitBranch());

    ReportBuilder reportBuilder = new ReportBuilder(jsonFiles, configuration);
    reportBuilder.generateReports();
  }

  /**
   * Identifica a branch atual.
   *
   * @return a branch
   */
  public static String getCurrentGitBranch() {
    String result = null;
    try {
      Process process = Runtime.getRuntime().exec("git rev-parse --abbrev-ref HEAD");

      process.waitFor();

      BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

      result = reader.readLine();
    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
    }


    return result;
  }
}
