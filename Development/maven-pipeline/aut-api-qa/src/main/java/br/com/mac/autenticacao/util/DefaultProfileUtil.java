package br.com.mac.autenticacao.util;

import br.com.mac.autenticacao.config.ApplicationConstants;
import java.util.HashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;
import org.springframework.boot.SpringApplication;

public final class DefaultProfileUtil {

  private static final String SPRING_PROFILE_DEFAULT = "spring.profiles.default";

  private DefaultProfileUtil() {
  }

  /**
   * Set a default to use when no profile is configured.
   *
   * @param app the Spring application.
   */
  public static void addDefaultProfile(@NotNull SpringApplication app) {
    Map<String, Object> defProperties = new HashMap<>();
    defProperties.put(SPRING_PROFILE_DEFAULT, ApplicationConstants.SPRING_PROFILE_DEVELOPMENT);
    app.setDefaultProperties(defProperties);
  }
}
