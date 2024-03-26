package br.com.machina.estautoecapi.service;

import br.com.machina.estautoecapi.bean.Endereco;
import br.com.machina.estautoecapi.bean.NomesMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Component
public class FakeList {

    @Autowired
    private MotorPoliticaService service;

    @Autowired
    private CepService cepService;

    public List<String> buildFakeListNomesMae(String nomeMae) {
        return buildFakeListNomes("FEMININO", nomeMae);
    }

    public List<String> buildFakeListNomes(String sexo, String nome) {
        return buildFakeListNomes(sexo, nome, 0);
    }

    public List<String> buildFakeListNomes(String sexo, String nome, int index) {
        if (isNull(nome) || nome.isEmpty())
            return Collections.emptyList();

        nome = nome.toUpperCase();
        List<String> nomes = new ArrayList<>();
        nomes.add(nome);
        String sobrenome = extractSobrenome(nome);

        if (isNull(sexo) || "FEMININO".equals(sexo.toUpperCase()))
            nomes.addAll(NomesMap.getNomesFemininosStartingWith(nome.substring(index, index + 1), sobrenome));
        else
            nomes.addAll(NomesMap.getNomesMasculinosStartingWith(nome.substring(index, index + 1), sobrenome));

        nomes = validaDuplicados(sexo, nomes, index);
        nomes.sort(String.CASE_INSENSITIVE_ORDER);
        nomes.forEach(n -> n.toUpperCase());
        return nomes;
    }

    private List<String> validaDuplicados(String sexo, List<String> nomes, int index) {
        if (new HashSet<>(nomes).size() == 4 || index > 4)
            return nomes;

        return buildFakeListNomes(sexo, nomes.get(0), index + 1);
    }

    public List<String> buildFakeListEnderecos(Endereco endereco) {
        if (isNull(endereco) || isNull(endereco.getLogradouro()) || endereco.getLogradouro().isEmpty())
            return Collections.emptyList();

        return cepService.getLogradouros(endereco).stream().sorted(String::compareTo).collect(Collectors.toList());
    }

    public List<LocalDate> buildFakeListDataNascimento(LocalDate date) {
        if (isNull(date))
            return Collections.emptyList();

        LocalDate date2 = date.minusDays(genRandom());
        LocalDate date3 = date.plusDays(genRandom());
        LocalDate date4 = date.minusDays(genRandom());

        List<LocalDate> dates = new ArrayList<>();
        dates.addAll(Arrays.asList(date, date2, date3, date4));

        dates.sort(LocalDate::compareTo);

        return dates;
    }

    private int genRandom() {
        return new Random().ints(-450, 450)
                .findFirst()
                .getAsInt();
    }

    private String extractSobrenome(String nome) {
        String[] s = nome.split(" ");
        String sobrenome = "";
        for (int i = 1; i < s.length; i++) {
            sobrenome = sobrenome.concat(" ").concat(s[i]);
        }
        return sobrenome;
    }
}
