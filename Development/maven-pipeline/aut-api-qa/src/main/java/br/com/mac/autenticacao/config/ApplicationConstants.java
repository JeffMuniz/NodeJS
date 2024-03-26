package br.com.mac.autenticacao.config;

public abstract class ApplicationConstants {
  public static final String SPRING_PROFILE_DEVELOPMENT = "dev";
  public static final String SPRING_PROFILE_TEST = "test";
  public static final String SPRING_PROFILE_QA = "qa";
  public static final String SPRING_PROFILE_STAGING = "stg";
  public static final String SPRING_PROFILE_PRODUCTION = "prod";
  public static final String SPRING_PROFILE_CLOUD = "cloud";
  public static final String SPRING_PROFILE_SWAGGER = "swagger";

  private ApplicationConstants() {
  }
}
