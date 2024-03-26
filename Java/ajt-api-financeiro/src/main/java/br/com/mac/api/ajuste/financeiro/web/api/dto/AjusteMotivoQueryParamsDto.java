package br.com.mac.api.ajuste.financeiro.web.api.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AjusteMotivoQueryParamsDto implements Serializable{

	private static final long serialVersionUID = 3720316285605103804L;

	private Integer operacao;
	private Integer tipo;
	private Boolean ativo;
}
