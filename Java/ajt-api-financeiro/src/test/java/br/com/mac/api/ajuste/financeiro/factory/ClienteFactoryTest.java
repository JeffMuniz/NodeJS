package br.com.mac.api.ajuste.financeiro.factory;

import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@NoArgsConstructor
public class ClienteFactoryTest {

    public static ClienteEntity clienteUmTipoCpf() {
        return ClienteEntity.builder()
                .nome("Teste Cliente 1")
                .cnpj("")
                .cpf("40832275607")
                .idConta(1321)
		.dataCriacao(ZonedDateTime.now())
		.dataModificacao(ZonedDateTime.now()).build();
	}

	public static ClienteEntity clienteDoisTipoCpf() {
		return ClienteEntity.builder()
                .nome("Teste Cliente 2")
                .cnpj("")
                .cpf("40833875606")
                .idConta(1545)
		.dataCriacao(ZonedDateTime.now())
		.dataModificacao(ZonedDateTime.now()).build();
	}

    public static ClienteEntity clienteUmTipoCnpj() {
		return ClienteEntity.builder()
		.nome("Empresa 1")
		.cnpj("14335895000120")
		.cpf("")
		.idConta(null)
		.dataCriacao(ZonedDateTime.now())
		.dataModificacao(ZonedDateTime.now()).build();
	}

}

