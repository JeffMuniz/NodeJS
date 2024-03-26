package br.com.mac.autenticacao.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.afterburner.AfterburnerModule;
import java.util.TimeZone;
import javax.annotation.PostConstruct;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class JacksonConfiguration {

  @PostConstruct
  public void init() {
    TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
  }

  /**
   * Cria uma instância de {@link ObjectMapper}.
   *
   * @return uma instância de {@link ObjectMapper}
   */
  @Bean
  public ObjectMapper jsonObjectMapper() {
    return Jackson2ObjectMapperBuilder.json()
        .serializationInclusion(JsonInclude.Include.NON_NULL) // Don’t include null values
        .featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS) //ISODate
        .modules(new JavaTimeModule())
        .build()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
  }

  /**
   * Support for Java date and time API.
   *
   * @return the corresponding Jackson module.
   */
  @NotNull
  @Bean
  public JavaTimeModule javaTimeModule() {
    return new JavaTimeModule();
  }

  @NotNull
  @Bean
  public Jdk8Module jdk8TimeModule() {
    return new Jdk8Module();
  }

  /*
   * Support for Hibernate types in Jackson.
   */
  @NotNull
  @Bean
  public Hibernate5Module hibernate5Module() {
    return new Hibernate5Module();
  }

  /*
   * Jackson Afterburner module to speed up serialization/deserialization.
   */
  @NotNull
  @Bean
  public AfterburnerModule afterburnerModule() {
    return new AfterburnerModule();
  }
}
