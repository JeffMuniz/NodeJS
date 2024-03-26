package br.com.mac.autenticacao.model;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements Serializable {

  private static final long serialVersionUID = -7695365216142408758L;

  private String id;

  private String email;

  private String senha;

  private String perfil;
}
