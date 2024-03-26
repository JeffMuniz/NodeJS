package br.com.machina.estautoecapi.bean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class NomesMap {

    public static List<String> getNomesFemininosStartingWith(final String letra, final String sobrenome) {
        List<String> nList;
        switch (letra.toUpperCase()) {
            case "A":
                nList = Arrays.asList("Ana", "Alice", "Amanda");
                break;
            case "B":
                nList = Arrays.asList("Beatriz", "Bruna", "Bianca");
                break;
            case "C":
                nList = Arrays.asList("Camila", "Cecília", "Cláudia");
                break;
            case "D":
                nList = Arrays.asList("Daniela", "Débora", "Denise");
                break;
            case "E":
                nList = Arrays.asList("Estér", "Elisa", "Érica");
                break;
            case "F":
                nList = Arrays.asList("Fernanda", "Fabricia", "Flávia");
                break;
            case "G":
                nList = Arrays.asList("Gabrielle", "Gisele", "Graziela");
                break;
            case "H":
                nList = Arrays.asList("Helena", "Heloísa", "Ingrid");
                break;
            case "I":
                nList = Arrays.asList("Isabela", "Isadora", "Irene");
                break;
            case "J":
                nList = Arrays.asList("Júlia", "Juliana", "Joana");
                break;
            case "K":
                nList = Arrays.asList("Karen", "Kelly", "Késia");
                break;
            case "L":
                nList = Arrays.asList("Laura", "Larissa", "Lorena");
                break;
            case "M":
                nList = Arrays.asList("Maria", "Mariana", "Maria Eduarda");
                break;
            case "N":
                nList = Arrays.asList("Neusa", "Nádia", "Natália");
                break;
            case "O":
                nList = Arrays.asList("Olivia", "Odete", "Olga");
                break;
            case "P":
                nList = Arrays.asList("Priscila", "Patricia", "Paula");
                break;
            case "Q":
                nList = Arrays.asList("Quezia", "Beatriz", "Karen");
                break;
            case "R":
                nList = Arrays.asList("Rebeca", "Roberta", "Raquel");
                break;
            case "S":
                nList = Arrays.asList("Sofia", "Sara", "Sophia");
                break;
            case "T":
                nList = Arrays.asList("Tamires", "Tânia", "Thaís");
                break;
            case "U":
                nList = Arrays.asList("Karen", "Olivia", "Estér");
                break;
            case "V":
                nList = Arrays.asList("Valentina", "Vitória", "Vanessa");
                break;
            case "X":
                nList = Arrays.asList("Xênia", "Sofia", "Graziela");
                break;
            case "W":
                nList = Arrays.asList("Wanda", "Walquíria", "Bruna");
                break;
            case "Y":
                nList = Arrays.asList("Yasmim", "Yara", "Juliana");
                break;
            case "Z":
                nList = Arrays.asList("Zilda", "Yasmin", "Isadora");
                break;
            default:
                nList = Arrays.asList("Juliana", "Fernanda", "Camila");
                break;
        }
        return concatSobrenome(nList, sobrenome);
    }

    public static List<String> getNomesMasculinosStartingWith(final String letra, final String sobrenome) {
        List<String> nList;
        switch (letra.toUpperCase()) {
            case "A":
                nList = Arrays.asList("Arthur", "Antônio", "Anthony");
                break;
            case "B":
                nList = Arrays.asList("Bryan", "Bruno", "Breno");
                break;
            case "C":
                nList = Arrays.asList("Caio", "Carlos", "Calebe");
                break;
            case "D":
                nList = Arrays.asList("Daniel", "Diego", "Davi");
                break;
            case "E":
                nList = Arrays.asList("Eric", "Elias", "Elano");
                break;
            case "F":
                nList = Arrays.asList("Fernando", "Fabio", "Fabiano");
                break;
            case "G":
                nList = Arrays.asList("Gabriel", "Gustavo", "Giovani");
                break;
            case "H":
                nList = Arrays.asList("Heitor", "Hector", "Henri");
                break;
            case "I":
                nList = Arrays.asList("Igor", "Isaque", "Iago");
                break;
            case "J":
                nList = Arrays.asList("Júlio", "José", "João");
                break;
            case "K":
                nList = Arrays.asList("Kauê", "Kauan", "Kaleb");
                break;
            case "L":
                nList = Arrays.asList("Lucas", "macn", "Leandro");
                break;
            case "M":
                nList = Arrays.asList("Mario", "Marcus", "Mauro");
                break;
            case "N":
                nList = Arrays.asList("Nicolas", "Nathan", "Noah");
                break;
            case "O":
                nList = Arrays.asList("Olivera", "Osvaldo", "Oliver");
                break;
            case "P":
                nList = Arrays.asList("Pedro", "Paulo", "Pietro");
                break;
            case "Q":
                nList = Arrays.asList("Queiroz", "Osvaldo", "Quemuel");
                break;
            case "R":
                nList = Arrays.asList("Rodrigo", "Roberto", "Rafael");
                break;
            case "S":
                nList = Arrays.asList("Silveira", "Saulo", "Samuel");
                break;
            case "T":
                nList = Arrays.asList("Theo", "Thomas", "Thales");
                break;
            case "U":
                nList = Arrays.asList("Uendel", "Kauan", "Osvaldo");
                break;
            case "V":
                nList = Arrays.asList("Victor", "Valentim", "Vanderson");
                break;
            case "X":
                nList = Arrays.asList("Xavier", "Xisto", "Roberto");
                break;
            case "W":
                nList = Arrays.asList("Wendell", "Roberto", "Walter");
                break;
            case "Y":
                nList = Arrays.asList("Yuri", "Yan", "Yohan");
                break;
            case "Z":
                nList = Arrays.asList("Roberto", "Zaqueu", "Zack");
                break;
            default:
                nList = Arrays.asList("Guilherme", "Angelo", "Walter");
                break;
        }
        return concatSobrenome(nList, sobrenome);
    }

    private static List<String> concatSobrenome(List<String> nList, String sobrenome) {
        List<String> names = new ArrayList<>();
        for (String n : nList) {
            names.add(n.concat(sobrenome).toUpperCase());
        }
        return names;
    }
}
