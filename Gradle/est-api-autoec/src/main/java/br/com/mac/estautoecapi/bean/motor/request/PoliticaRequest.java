package br.com.machina.estautoecapi.bean.motor.request;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import static br.com.machina.estautoecapi.bean.motor.request.Politica.SANTANDER_SERASA;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoliticaRequest implements Serializable {

     private static final long serialVersionUID = 5809246951922195020L;

     private String cnpj;

     @Default
     private Politica fluxoPolitica = SANTANDER_SERASA;
}
