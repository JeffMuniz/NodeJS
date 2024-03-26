package br.com.mac.autenticacao.config;

import java.time.ZonedDateTime;
import lombok.Data;

/**
 * Classe LogInfo - representa as informacoes do log.
 *
 * @author Mac Visa Card 2019
 * @version 1.0
 */
@Data
public class LogInfo {

  private String classe;

  private String metodo;

  private Integer status;

  private String args;

  private String nomeServidor;

  private String ip;

  private Long tempoResposta;

  private String erro;

  private ZonedDateTime data;

  private String api;

  private Momento momento;

  public enum Momento {
    INICIO,
    TERMINO
  }
}
