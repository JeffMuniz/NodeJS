package br.com.mac.autenticacao.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  public void configure(@NotNull HttpSecurity http) throws Exception {
    http
        .csrf()
        .disable()
        .exceptionHandling()
        .and()
        .headers()
        .contentSecurityPolicy(
            "default-src 'self'; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:")
        .and()
        .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
        .and()
        .featurePolicy(
            "geolocation 'none'; midi 'none'; sync-xhr 'none'; "
                + "microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; "
                + "speaker 'none'; fullscreen 'self'; payment 'none'")
        .and()
        .frameOptions()
        .deny()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .antMatchers("/**").permitAll();
  }
}
