package br.com.mac.autenticacao;


import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition;
import org.junit.jupiter.api.Test;

class ArchTest {

  @Test
  void servicesAndRepositoriesShouldNotDependOnWebLayer() {

    JavaClasses importedClasses = new ClassFileImporter()
        .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
        .importPackages("br.com.mac.autenticacao");

    ArchRuleDefinition.noClasses()
        .that()
        .resideInAnyPackage("..business..")
        .should().dependOnClassesThat()
        .resideInAnyPackage("..br.com.mac.autenticacao.web.api")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
  }
}
