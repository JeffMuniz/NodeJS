package br.com.conductor.apimotorpolitica.service;

import br.com.conductor.apimotorpolitica.dto.response.Endereco;
import br.com.conductor.apimotorpolitica.services.cep.CepService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class CepServiceTest {

    @InjectMocks
    private CepService service;

    @Mock
    private RestTemplate rest;

    @Test
    public void consultarEnderecosDefaultTest(){
        Endereco[] mockResponse = getMockEnderecos();
        when(rest.getForEntity(any(), eq(Endereco[].class))).thenReturn(ResponseEntity.ok(mockResponse));

        service.getLogradouros(Endereco.builder().uf("SP").cidade("Santos").logradouro("Rua Santa Marcelina de Vaz Sás").build());

        verify(rest, times(1)).getForEntity(any(), eq(Endereco[].class));
    }

    private Endereco[] getMockEnderecos() {
        return new Endereco[]{Endereco.builder().logradouro("Rua UM").build(),
                Endereco.builder().logradouro("Rua Teste").build(), Endereco.builder().logradouro("Rua Dois").build(), Endereco.builder().logradouro("Rua 3").build()};
    }

    @Test
    public void consultarEnderecosSoEncontra1RuaPorCallTest(){
        Endereco[] mockResponse = {Endereco.builder().build()};
        when(rest.getForEntity(any(), eq(Endereco[].class))).thenReturn(ResponseEntity.ok(mockResponse));

        service.getLogradouros(Endereco.builder().uf("SP").cidade("Santos").logradouro("Rua Santa Marcelina de Vaz Sás").build());

        verify(rest, times(1)).getForEntity(any(), eq(Endereco[].class));
    }

}
