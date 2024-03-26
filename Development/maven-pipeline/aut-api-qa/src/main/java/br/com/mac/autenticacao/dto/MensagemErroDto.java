package br.com.mac.autenticacao.dto;

import java.io.Serializable;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MensagemErroDto implements Serializable {

  private static final long serialVersionUID = 6347980348820100308L;

  private String messagem;
  private List<Error> erros;

  @Data
  @Builder
  public static class Error implements Serializable {

    private static final long serialVersionUID = 3508833568609528244L;

    private String code;
    private String messagem;
  }

}
