package br.com.mac.api.ajuste.financeiro.util;

import org.bouncycastle.x509.NoSuchParserException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * Classe utilitaria para conversao de objetos
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@SuppressWarnings("deprecation")
public final class ResultQueryUtil {

    /**
     * Converte o objeto em string
     *
     * @param obj - valor
     * @return String
     * @throws Exception - erro na conversao
     */
    public static String getString(final Object obj) throws Exception {
        return ResultQueryUtil.getString(obj, false);
    }

    /**
     * Converte o objeto em string
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return String
     * @throws Exception - erro na conversao
     */
    public static String getString(final Object obj, boolean obrigatorio) throws Exception {
        try {
            return obj.toString();
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ String");
            }
            return null;
        }
    }

    /**
     * Converte o objeto em Integer
     *
     * @param obj - valor
     * @return Integer
     * @throws Exception - erro na conversao
     */
    public static Integer getInt(final Object obj) throws Exception {
        return ResultQueryUtil.getInt(obj, false);
    }

    /**
     * Converte o objeto em Integer
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return Integer
     * @throws Exception - erro na conversao
     */
    public static Integer getInt(final Object obj, boolean obrigatorio) throws Exception {
        try {
            return new Integer(ResultQueryUtil.getString(obj, obrigatorio));
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ Integer");
            }
            return null;
        }
    }

    /**
     * Converte o objeto em Long
     *
     * @param obj - valor
     * @return Long
     * @throws Exception - erro na conversao
     */
    public static Long getLong(final Object obj) throws Exception {
        return ResultQueryUtil.getLong(obj, false);
    }

    /**
     * Converte o objeto em Long
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return Long
     * @throws Exception - erro na conversao
     */
    public static Long getLong(final Object obj, boolean obrigatorio) throws Exception {
        try {
            return new Long(ResultQueryUtil.getString(obj, obrigatorio));
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ Long");
            }
            return null;
        }
    }

    /**
     * Converte o objeto em BigDecimal
     *
     * @param obj - valor
     * @return BigDecimal
     * @throws Exception - erro na conversao
     */
    public static BigDecimal getBigDecimal(final Object obj) throws Exception {
        return ResultQueryUtil.getBigDecimal(obj, false);
    }

    /**
     * Converte o objeto em BigDecimal
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return BigDecimal
     * @throws Exception - erro na conversao
     */
    public static BigDecimal getBigDecimal(final Object obj, boolean obrigatorio) throws Exception {
        try {
            return new BigDecimal(new Double(ResultQueryUtil.getString(obj, obrigatorio))).setScale(2, RoundingMode.HALF_UP);
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ BigDecimal");
            }
            return null;
        }
    }

    /**
     * Converte o objeto em LocalDateTime
     *
     * @param obj - valor
     * @return LocalDateTime
     * @throws Exception - erro na conversao
     */
    public static LocalDateTime getLocalDateTime(final Object obj) throws Exception {
        return ResultQueryUtil.getLocalDateTime(obj, false);
    }

    /**
     * Converte o objeto em Date yyyy-MM-dd
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return Date
     * @throws Exception - erro na conversao
     */
    public static Date getDate(final Object obj, boolean obrigatorio) throws Exception {
        if (obrigatorio) {
            LocalDate localDate = ResultQueryUtil.getLocalDate(obj, "yyyy-MM-dd", false);
            return java.sql.Date.valueOf(localDate);
        } else {
            return null;
        }
    }

    /**
     * Converte o objeto em Date yyyy-MM-dd HH:mm:ss.S
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return Date
     * @throws Exception - erro na conversao
     */
    public static Date getDateHour(final Object obj, boolean obrigatorio) throws Exception {
        try {
            String str = ResultQueryUtil.getString(obj).substring(0, 19);
            LocalDateTime localDateTime = ResultQueryUtil.getLocalDateTime(str, "yyyy-MM-dd HH:mm:ss", false);
            return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ LocalDateTime");
            }
            return null;
        }
    }

    /**
     * Converte o objeto em LocalDateTime
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return LocalDateTime
     * @throws Exception - erro na conversao
     */
    public static LocalDateTime getLocalDateTime(final Object obj, boolean obrigatorio) throws Exception {
        return ResultQueryUtil.getLocalDateTime(obj, "yyyy-MM-dd HH:mm:ss.S", false);
    }

    /**
     * Converte o objeto em LocalDateTime
     *
     * @param obj         - valor
     * @param formatacao  - pattern (formatacao) da data. Exemplo: yyyy-MM-dd HH:mm ou yyyy-MM-dd
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return LocalDateTime
     * @throws Exception - erro na conversao
     */
    public static LocalDateTime getLocalDateTime(final Object obj, String formatacao, boolean obrigatorio) throws Exception {
        try {
            String str = ResultQueryUtil.getString(obj);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatacao);
            LocalDateTime parse = LocalDateTime.parse(str, formatter);
            if (obrigatorio && parse == null) {
                throw new NoSuchParserException("Nao foi possivel converter p/ LocalDateTime");
            }
            return parse;
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ LocalDateTime");
            }
            return null;
        }
    }


    /**
     * Converte o objeto em LocalDate
     *
     * @param obj         - valor
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return LocalDate
     * @throws Exception - erro na conversao
     */
    public static LocalDate getLocalDate(final Object obj, boolean obrigatorio) throws Exception {
        return ResultQueryUtil.getLocalDate(obj, "yyyy-MM-dd", false);
    }

    /**
     * Converte o objeto em LocalDate
     *
     * @param obj         - valor
     * @param formatacao  - pattern (formatacao) da data. Exemplo: yyyy-MM-dd HH:mm ou yyyy-MM-dd
     * @param obrigatorio - se o campo e obrigatorio ou nao
     *                    caso seja e nao tenha valor seja devolvido NoSuchParserException
     * @return LocalDate
     * @throws Exception - erro na conversao
     */
    public static LocalDate getLocalDate(final Object obj, String formatacao, boolean obrigatorio) throws Exception {
        try {
            String str = ResultQueryUtil.getString(obj).substring(0, 10);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatacao);
            LocalDate parse = LocalDate.parse(str, formatter);
            if (obrigatorio && parse == null) {
                throw new NoSuchParserException("Nao foi possivel converter p/ LocalDate");
            }
            return parse;
        } catch (final Exception e) {
            if (obrigatorio) {
                throw new NoSuchParserException("Nao foi possivel converter p/ LocalDate");
            }
            return null;
        }
    }


}
