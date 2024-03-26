package br.com.conductor.apimotorpolitica.service;

import br.com.conductor.apimotorpolitica.client.serasa.PessoaFisicaClient;
import br.com.conductor.apimotorpolitica.domain.convert.PessoaFisicaConvert;
import br.com.conductor.apimotorpolitica.dto.request.ValidaPessoaFisicaRequest;
import br.com.conductor.apimotorpolitica.dto.response.Endereco;
import br.com.conductor.apimotorpolitica.dto.response.PessoaFisicaResponse;
import br.com.conductor.apimotorpolitica.exception.ExceptionMotor;
import br.com.conductor.apimotorpolitica.repository.PessoaFisicaRepository;
import br.com.conductor.apimotorpolitica.services.serasa.SerasaService;
import br.com.conductor.apimotorpolitica.stubs.serasa.ConsultarPFResponse;
import br.com.conductor.apimotorpolitica.stubs.serasa.PessoaFisica;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;
import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class SerasaServiceTest {

    @InjectMocks
    private SerasaService service;

    @Mock
    private PessoaFisicaClient pessoaFisicaClient;

    @Mock
    private PessoaFisicaConvert convertPessoaFisica;

    @Mock
    private PessoaFisicaRepository pessoaFisicaRepository;

    @Mock
    private FakeList fakeList;

    @Test
    public void consultarPessoaFisicaJaExistenteTest(){
        String cpf = "05642456430";
        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().cpf(cpf).build());

        PessoaFisicaResponse pfResponse = service.consultarPessoaFisica(cpf);

        assertThat(pfResponse).isNotNull();
        assertThat(pfResponse.getCpf()).isEqualTo(cpf);

        verify(pessoaFisicaClient, never()).recuperarPF(any());
    }

    @Test
    public void consultarPessoaFisicaValidaTest(){
        String cpf = "05642456430";

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(null);
        when(pessoaFisicaClient.recuperarPF(any())).thenReturn(mockPF(cpf));
        when(convertPessoaFisica.convert(any())).thenReturn(PessoaFisicaResponse.builder().endereco(Endereco.builder().cep("05724003").build()).build());

        when(fakeList.buildFakeListNomes(anyString(), anyString())).thenReturn(Collections.emptyList());
        when(fakeList.buildFakeListNomesMae(anyString())).thenReturn(Collections.emptyList());
        when(fakeList.buildFakeListDataNascimento(any())).thenReturn(Collections.emptyList());
        when(fakeList.buildFakeListEnderecos(any())).thenReturn(Collections.emptyList());

        when(pessoaFisicaRepository.save(any())).thenReturn(PessoaFisicaResponse.builder().build());

        PessoaFisicaResponse pfResponse = service.consultarPessoaFisica(cpf);

        assertThat(pfResponse).isNotNull();
        verify(fakeList, times(1)).buildFakeListNomesMae(anyString());
        verify(fakeList, times(1)).buildFakeListNomes(anyString(), anyString());
        verify(fakeList, times(1)).buildFakeListDataNascimento(any());
        verify(fakeList, times(1)).buildFakeListEnderecos(any());
    }

    @Test
    public void consultarPessoaFisicaValidaSemEnderecoTest(){
        String cpf = "05642456430";

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(null);
        when(pessoaFisicaClient.recuperarPF(any())).thenReturn(mockPF(cpf));
        when(convertPessoaFisica.convert(any())).thenReturn(PessoaFisicaResponse.builder().build());

        when(fakeList.buildFakeListNomes(anyString(), anyString())).thenReturn(Collections.emptyList());
        when(fakeList.buildFakeListNomesMae(anyString())).thenReturn(Collections.emptyList());
        when(fakeList.buildFakeListDataNascimento(any())).thenReturn(Collections.emptyList());
        when(fakeList.buildFakeListEnderecos(any())).thenReturn(Collections.emptyList());

        when(pessoaFisicaRepository.save(any())).thenReturn(PessoaFisicaResponse.builder().build());

        PessoaFisicaResponse pfResponse = service.consultarPessoaFisica(cpf);

        assertThat(pfResponse).isNotNull();

        verify(fakeList, times(1)).buildFakeListNomesMae(anyString());
        verify(fakeList, times(1)).buildFakeListNomes(anyString(), anyString());
        verify(fakeList, times(1)).buildFakeListDataNascimento(any());
        verify(fakeList, times(1)).buildFakeListEnderecos(any());
    }

    @Test(expected = ExceptionMotor.class)
    public void consultarPessoaFisicaCpfSerasaNotFoundTest(){
        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(null);
        when(pessoaFisicaClient.recuperarPF(any())).thenReturn(mockPF(null));

        PessoaFisicaResponse pfResponse = service.consultarPessoaFisica("");
    }

    @Test
    public void validarPessoaByNomeSuccessTest(){
        String nome = "Nome Teste Pessoa";
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setNome(nome);

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().nome(nome).build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertTrue(isValida);
    }

    @Test
    public void validarPessoaNaoEncontradaTest(){
        String nome = "Nome Teste Pessoa";
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setNome(nome);

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(null);

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertFalse(isValida);
    }

    @Test
    public void validarPessoaByNomeErrorTest(){
        String nome = "Nome Teste Pessoa";
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setNome(nome);

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().nome(nome + "2").build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertFalse(isValida);
    }

    @Test
    public void validarPessoaByNomeMaeSuccessTest(){
        String nome = "Nome Teste Pessoa";
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setNomeMae(nome);

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().nomeMae(nome).build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertTrue(isValida);
    }

    @Test
    public void validarPessoaByNomeMaeErrorTest(){
        String nome = "Nome Teste Pessoa";
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setNomeMae(nome);

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().nomeMae(nome + "2").build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertFalse(isValida);
    }

    @Test
    public void validarPessoaByEnderecoSuccessTest(){
        String nomeRua = "Rua teste";

        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setLogradouro(nomeRua);

        Endereco mockEndereco = new Endereco();
        mockEndereco.setLogradouro(nomeRua);
        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().endereco(mockEndereco).build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertTrue(isValida);
    }

    @Test
    public void validarPessoaByEnderecoErrorTest(){
        String nomeRua = "Rua teste";

        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setLogradouro(nomeRua + "2");

        Endereco mockEndereco = new Endereco();
        mockEndereco.setLogradouro(nomeRua);
        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().endereco(mockEndereco).build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertFalse(isValida);
    }

    @Test
    public void validarPessoaByDateSuccessTest(){
        LocalDate dtMock = LocalDate.now();
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setDataNascimento(dtMock);

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().dataNascimento(dtMock).build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertTrue(isValida);
    }

    @Test
    public void validarPessoaByDateErrorTest(){
        LocalDate dtMock = LocalDate.now();
        ValidaPessoaFisicaRequest mockPessoa = new ValidaPessoaFisicaRequest();
        mockPessoa.setCpf("123");
        mockPessoa.setDataNascimento(dtMock.minusDays(1));

        when(pessoaFisicaRepository.findByCpf(anyString())).thenReturn(PessoaFisicaResponse.builder().dataNascimento(dtMock).build());

        Boolean isValida = service.isPessoaFisicaValida(mockPessoa);

        assertFalse(isValida);
    }

    private ConsultarPFResponse mockPF(String cpf) {
        ConsultarPFResponse mockPFResponse = new ConsultarPFResponse();
        PessoaFisica mockPF = new PessoaFisica();
        mockPF.setSexo("MASCULINO");
        mockPF.setCpf(cpf);
        mockPF.setNome("Nome Mock");
        mockPF.setNomeMae("Nome Mãe Mock");
        mockPFResponse.setResult(mockPF);
        return mockPFResponse;
    }

}
