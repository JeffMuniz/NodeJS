package br.com.mac.api.ajuste.financeiro.util;

import java.text.MessageFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.bouncycastle.x509.NoSuchParserException;

public class DateUtil {

    private DateUtil() {
    }

    /**
     * Converte String em LocalDate da data confirmacao financeira
     *
     * @return LocalDate
     * @throws Exception - Erro na convercao
     */
    public static LocalDate parseData(String data) throws Exception {
        try {
            if (data == null) {
                return null;
            }
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate parse = LocalDate.parse(data, formatter);
            return parse;
        } catch (final Exception e) {
            throw new NoSuchParserException("Nao foi possivel converter para data. Utilizar formato yyyy-MM-dd");
        }
    }
    
    /**
     * Converte ZonedDateTime para LocalDate
     * @param dataString - string de ZonedDateTime
     * @return LocalDate
     */
    public static LocalDate parseZonedDateTimeByLocalDate(final String dataString) {
    	try {
    		if(dataString == null || dataString.isEmpty()) {
	    		return null;
	    	}else {
	    		Instant instant = Instant.parse(dataString);
	    		return LocalDate.ofInstant(instant, ZoneId.of(ZoneOffset.UTC.getId()));
	    	}
	    } catch (final Exception e) {
    		return null;
	    }
	}
    
    /**
     * Converte LocalDateTime para ZonedDateTime
     * @param dataString - string de LocalDateTime
     * @return ZonedDateTime
     */
    public static ZonedDateTime parseLocalDateTimeByZonedDateTime(final LocalDateTime dateTime) {
    	try {
	    	if(dateTime == null) {
	    		return null;
	    	}else {
	    		Instant instant = Instant.parse(dateTime.toString());
	    		return ZonedDateTime.ofInstant(instant, ZoneId.of(ZoneOffset.UTC.getId()));
	    	}
	    } catch (final Exception e) {
    		return null;
	    }
	}


	/**
	 * Converte String para ZonedDateTime
	 * @param dataString - string de LocalDateTime
	 * @return ZonedDateTime
	 */
	public static ZonedDateTime parseStringByZonedDateTime(final String dateTime) {
		return ZonedDateTime.parse(
				MessageFormat.format("{0} 00:00:00 {1}",
						dateTime, ZoneId.systemDefault()),
				DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss z"));
	}

	/**
	 * Converte ZonedDateTime para String com formato dd/MM/yyyy - HH:mm:ss
	 * @param zonedDateTime - ZonedDateTime
	 * @return String (dd/MM/yyyy - HH:mm:ss)
	 */
	public static String parseZonedDateTimeByString(final ZonedDateTime zonedDateTime){
		if(zonedDateTime == null) {
			return null;
		}else {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy - HH:mm:ss");
			return zonedDateTime.format(formatter);
		}
	}
	
	/**
	 * Converte ZonedDateTime para String com formato BR dd/MM/yyyy
	 * @param zonedDateTime - ZonedDateTime
	 * @return String (dd/MM/yyyy)
	 */
	public static String parseZonedDateTimeByDateFormatBR(final ZonedDateTime zonedDateTime){
		if(zonedDateTime == null) {
			return null;
		}else {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
			return zonedDateTime.format(formatter);
		}
	}
	

}
