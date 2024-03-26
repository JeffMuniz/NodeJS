package br.com.mac.api.ajuste.financeiro.cucumber.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FiltroAjustesTest {

	private String campo;
	private String valor;
	
}
