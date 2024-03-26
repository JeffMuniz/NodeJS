package br.com.mac.api.ajuste.financeiro.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.Optional;
import java.util.Properties;

/**
 * Classe QueryUtil - Classe utilitaria que busca as queries que serao executadas
 * @author mac Visa Card 2019
 * @version 1.0
 */
public final class QueryUtil {

    /**
     * Constante logger.
     */
    private static final Logger log = LoggerFactory.getLogger(QueryUtil.class);

    /**
     * FILTRO PADRAO
     */
    private static String padraoFiltro = " AND :CAMPO_FILTRO LIKE ':VALOR_FILTRO' ";

    /**
     * Busca a query desejada de aprovacao
     *
     * @param queryID- identificador da query
     * @return String com a query resgatada do xml
     */
    public static String queryAprovacao(final String queryID) throws Exception {
        String query = null;
        try {
            ClassPathResource classPathResource = new ClassPathResource("native-query-aprovacao.xml");
            Properties properties = new Properties();
            properties.loadFromXML(classPathResource.getInputStream());
            query = properties.getProperty(queryID);
        } catch (IOException e) {
            log.error(e.getMessage(), ExceptionUtils.getStackTrace(e));
            throw new Exception("Erro ao ler arquivo xml de queries", e);
        } catch (Exception e) {
            log.error(e.getMessage(), ExceptionUtils.getStackTrace(e));
            throw new Exception("Erro ao buscar a query " + queryID
                    + " no arquivo externo de query's");
        }
        return query;
    }


    /**
     * Cria novo filtro em query
     *
     * @param filtros - valores que deseja filtrar por LIKE separados por ;
     * @param sql     - query que deve ser substituida, deve ter no WHERE o parametro :FILRO
     * @return Query com o filtro
     */
    public static String criarNovoFiltro(final String filtros, String sql) {
        try {
            String queryFiltro = StringUtils.EMPTY;
            if (filtros != null && !filtros.isEmpty()) {
                String[] filtrosValores = StringUtils.split(StringUtil.removerCaracterEspeciais(filtros), ";");
                for (int i = 0; i < filtrosValores.length; i++) {
                    String[] campoValor = StringUtils.split(filtrosValores[i], ":");
                    queryFiltro = queryFiltro + QueryUtil.padraoFiltro.
                            replaceAll(":CAMPO_FILTRO", campoValor[0]);
                    queryFiltro = queryFiltro.
                            replaceAll(":VALOR_FILTRO", "%".concat(campoValor[1]).concat("%"));
                }
                sql = sql.replaceAll(":FILTRO", queryFiltro.toUpperCase());
            } else {
                sql = sql.replaceAll(":FILTRO", StringUtils.EMPTY);
            }
        } catch (Exception e) {
            log.error("Não foi possível realizar o filtro. Exemplo CAMPO_1:VALOR_1;CAMPO_2:VALOR_2");
            log.error(e.getMessage(), ExceptionUtils.getStackTrace(e));
            sql = sql.replaceAll(":FILTRO", StringUtils.EMPTY);
        }
        return sql;
    }

    /**
     * Cria nova ordenacao da query
     * Por padrao filtra 'ORDER BY 1 DESC'
     *
     * @param campoOrdenacao - ordenacao
     * @param tipoOrdenacao  - tipo
     * @param sql            - query
     * @return query com ordenacao
     */
    public static String criarOrdenacao(String campoOrdenacao,
                                        String tipoOrdenacao,
                                        String sql) {
        return sql.replaceAll(":ORDENACAO",
                Optional.ofNullable(campoOrdenacao).orElse(" DT_CONF_FINANC ")
                        .concat(" ")
                        .concat(Optional.ofNullable(tipoOrdenacao).orElse("DESC")));
    }
}