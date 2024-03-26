package br.com.conductor.apimotorpolitica.service;

import br.com.conductor.apimotorpolitica.dto.response.Endereco;
import br.com.conductor.apimotorpolitica.services.cep.CepService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class FakeListTest {

    @InjectMocks
    private FakeList service;

    @Mock
    private CepService cepService;

    @Test
    public void buildFakeListNomesMasculinoTest() {
        String sexo = "Masculino";
        String nome = "Gilberto";

        List<String> returnedList = service.buildFakeListNomes(sexo, nome);

        assertThat(returnedList).isNotNull();
        assertThat(returnedList).hasSize(4);
        assertThat(returnedList).contains(nome.toUpperCase());
    }
    @Test
    public void buildFakeListNomesFemininoTest() {
        String sexo = "Feminino";
        String nome = "Camila";

        List<String> returnedList = service.buildFakeListNomes(sexo, nome);

        assertThat(returnedList).isNotNull();
        assertThat(returnedList).hasSize(4);
        assertThat(returnedList).contains(nome.toUpperCase());
    }
    @Test
    public void buildFakeListNomesSemSexoTest() {
        String sexo = null;
        String nome = "Paula";

        List<String> returnedList = service.buildFakeListNomes(sexo, nome);
        System.out.println(returnedList);
        assertThat(returnedList).isNotNull();
        assertThat(returnedList).hasSize(4);
        assertThat(returnedList).contains(nome.toUpperCase());
    }

    @Test
    public void buildFakeListNomesSexoInvalidoTest() {
        String sexo = "M";
        String nome = "Gilberto";

        List<String> returnedList = service.buildFakeListNomes(sexo, nome);

        assertThat(returnedList).isNotNull();
        assertThat(returnedList).hasSize(4);
        assertThat(returnedList).contains(nome.toUpperCase());
    }

    @Test
    public void buildFakeListNomesMaeTest() {
        String nome = "Nome";

        List<String> returnedList = service.buildFakeListNomesMae(nome);

        assertThat(returnedList).isNotNull();
        assertThat(returnedList).hasSize(4);
        assertThat(returnedList).contains(nome.toUpperCase());
    }

    @Test
    public void buildFakeListDatasNascimento(){

        List<LocalDate> returnedList = service.buildFakeListDataNascimento(LocalDate.now());

        assertThat(returnedList).isNotNull();
        assertThat(returnedList).hasSize(4);
    }

    @Test
    public void buildFakeListEnderecos(){
        Set<String> mockEnderecos = new HashSet<>();

        service.buildFakeListEnderecos(Endereco.builder().build());
    }

}
