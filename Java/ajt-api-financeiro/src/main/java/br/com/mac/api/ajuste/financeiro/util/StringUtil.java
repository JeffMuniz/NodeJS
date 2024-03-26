package br.com.mac.api.ajuste.financeiro.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

/**
 * Classe StringUtil - Classe utilitaria com metodos utilitarios para texto
 * @author mac Visa Card 2019
 * @version 1.0
 */
public final class StringUtil {

    /**
     * Remove caracter especial de uma string
     *
     * @param valor - valor a ser removido os caracteres
     * @return filtro sem  caracter especial
     */
    public static String removerCaracterEspeciais(String valor) {
        valor = valor == null ? StringUtils.EMPTY : valor;
        valor = valor.replace("=", "");
        valor = valor.replace(",", "");
        valor = valor.replace(".", "");
        valor = valor.replace("/", "");
        valor = valor.replace(";", "");
        valor = valor.replace(":", "");
        valor = valor.replace("'", "");
        valor = valor.replace("''", "");
        valor = valor.replace("-", "");
        return valor;
    }

    /**
     * Gera uma string de json dado chave e valor
     * @param chave - chave do json
     * @return string json
     */
    public static String getValorJson(final String jsonStr, final String chave){
        try{
            JSONObject jsonObj = new JSONObject(jsonStr);
            return jsonObj.getString(chave);
        }catch(Exception e){
            e.printStackTrace();
            return StringUtils.EMPTY;
        }
    }

    /**
     * Formata o cnpj
     * @param cnpj - cnpj nao formatado
     * @return string cnpj formatado
     */
    public static String formataCnpj(String cnpj) {
        try{
            int SIZE_OF_CNPJ = 14;
            cnpj = removerCaracterEspeciais(cnpj);
            cnpj = StringUtils.leftPad(cnpj, SIZE_OF_CNPJ, '0');
            if (cnpj != null) {
                cnpj =  cnpj.replaceAll("\\D", "");
                if ((cnpj.length() == SIZE_OF_CNPJ)) {
                    return cnpj.replaceAll("([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})","$1\\.$2\\.$3/$4-$5");
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return StringUtils.EMPTY;
    }

    /**
     * Formata o cpf
     * @param cpf - cpf nao formatado
     * @return string cpf formatado
     */
    public static String formataCpf(String cpf) {
        try{
            int SIZE_OF_CPF = 11;
            cpf = removerCaracterEspeciais(cpf);
            cpf = StringUtils.leftPad(cpf, SIZE_OF_CPF, '0');
            if (cpf != null) {
                cpf = cpf.replaceAll("\\D", "");
                if (cpf.length() == SIZE_OF_CPF) {
                    return cpf.replaceAll("([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})","$1\\.$2\\.$3-$4");
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return StringUtils.EMPTY;
    }

    /**
     * Formata o valor em Real (R$ xxx.xxx.xxx,xx)
     * @param valor - valor
     * @return string valor formatado
     */
    public static String formataValorReal(BigDecimal valor) {
        try{
            valor = valor.setScale(2, RoundingMode.HALF_UP);
            DecimalFormat format = new DecimalFormat("###,###,##0.00",
                    new DecimalFormatSymbols(new Locale("pt", "BR")));
            format.setParseBigDecimal(true);
            format.setDecimalSeparatorAlwaysShown(true);
            return "R$ ".concat(format.format(valor));
        }catch(Exception e){
            e.printStackTrace();
            return StringUtils.EMPTY;
        }
    }

}
