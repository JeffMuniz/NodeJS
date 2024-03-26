package br.com.machina.estautoecapi.service;

import br.com.machina.customexception.exception.NotFoundCustom;
import br.com.machina.estautoecapi.bean.Endereco;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Service
public class CepService {

    private String url = "https://viacep.com.br/ws/%s/%s/%s/json/";

    public Set<String> getLogradouros(Endereco enderecoBase) {
        return getLogradouros(enderecoBase, new HashSet(), 0);
    }

    private Set<String> getLogradouros(Endereco enderecoBase, Set<String> enderecos, int index) {
        try {
            String uri = createURIPorEndereco(enderecoBase, index);

            ResponseEntity<Endereco[]> response = null;//restTemplate.getForEntity(URI.create(uri), Endereco[].class);

            enderecos.add(enderecoBase.getLogradouro().toUpperCase());

            Iterator<Endereco> iterator = Arrays.stream(response.getBody()).iterator();
            while (iterator.hasNext() && enderecos.size() < 4) {
                enderecos.add(iterator.next().getLogradouro().toUpperCase());
            }
            if (enderecos.size() < 4)
                return getLogradouros(enderecoBase, enderecos, index + 1);

            return enderecos;
        } catch (Exception e) {
            return createEnderecosDefault(enderecoBase.getLogradouro());
        }
    }

    private Set<String> createEnderecosDefault(String logradouro) {
        Set<String> objects = new HashSet<>();
        objects.add(logradouro.toUpperCase());
        objects.add("RUA DA MOOCA");
        objects.add("AVENIDA Macna CESAR DE OLIVEIRA");
        objects.add("RUA RODION PODOLSKY");

        return objects;
    }

    private String buscaNomeRua(String logradouro, int index) {
        String[] s = logradouro.split(" ");

        if (index < s.length - 1)
            return s[index] + " " + s[index + 1];
        if (index >= s.length)
            throw new NotFoundCustom("");

        return s[index];
    }

    @SneakyThrows
    private static String formatURLParameters(String str) {
        return URLEncoder.encode(Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", ""), StandardCharsets.UTF_8.toString()).replace("+", "%20");
    }

    private String createURIPorEndereco(Endereco enderecoBase, int index) {
        return String.format(url, enderecoBase.getUf(), formatURLParameters(enderecoBase.getCidade()), formatURLParameters(buscaNomeRua(enderecoBase.getLogradouro(), index)));
    }
}
