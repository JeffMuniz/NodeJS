package br.com.mac.api.ajuste.financeiro.web.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;

public final class HeaderUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(HeaderUtil.class);

    private HeaderUtil() {
    }

    /**
     * <p>createAlert.</p>
     *
     * @param applicationName a {@link java.lang.String} object.
     * @param message         a {@link java.lang.String} object.
     * @param param           a {@link java.lang.String} object.
     * @return a {@link org.springframework.http.HttpHeaders} object.
     */
    @NotNull
    public static HttpHeaders createAlert(String applicationName, String message, @NotNull String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-" + applicationName + "-alert", message);
        try {
            headers.add("X-" + applicationName + "-params", URLEncoder.encode(param, StandardCharsets.UTF_8.toString()));
        } catch (UnsupportedEncodingException e) {
            // StandardCharsets are supported by every Java implementation so this exception will never happen
        }
        return headers;
    }

    /**
     * <p>createEntityCreationAlert.</p>
     *
     * @param applicationName   a {@link java.lang.String} object.
     * @param enableTranslation a boolean.
     * @param entityName        a {@link java.lang.String} object.
     * @param param             a {@link java.lang.String} object.
     * @return a {@link org.springframework.http.HttpHeaders} object.
     */
    @NotNull
    public static HttpHeaders createEntityCreationAlert(String applicationName, boolean enableTranslation, String entityName, @NotNull String param) {
        String message = enableTranslation ? applicationName + "." + entityName + ".created"
                : "A new " + entityName + " is created with identifier " + param;
        return createAlert(applicationName, message, param);
    }

    /**
     * <p>createEntityUpdateAlert.</p>
     *
     * @param applicationName   a {@link java.lang.String} object.
     * @param enableTranslation a boolean.
     * @param entityName        a {@link java.lang.String} object.
     * @param param             a {@link java.lang.String} object.
     * @return a {@link org.springframework.http.HttpHeaders} object.
     */
    @NotNull
    public static HttpHeaders createEntityUpdateAlert(String applicationName, boolean enableTranslation, String entityName, @NotNull String param) {
        String message = enableTranslation ? applicationName + "." + entityName + ".updated"
                : "A " + entityName + " is updated with identifier " + param;
        return createAlert(applicationName, message, param);
    }

    /**
     * <p>createEntityDeletionAlert.</p>
     *
     * @param applicationName   a {@link java.lang.String} object.
     * @param enableTranslation a boolean.
     * @param entityName        a {@link java.lang.String} object.
     * @param param             a {@link java.lang.String} object.
     * @return a {@link org.springframework.http.HttpHeaders} object.
     */
    @NotNull
    public static HttpHeaders createEntityDeletionAlert(String applicationName, boolean enableTranslation, String entityName, @NotNull String param) {
        String message = enableTranslation ? applicationName + "." + entityName + ".deleted"
                : "A " + entityName + " is deleted with identifier " + param;
        return createAlert(applicationName, message, param);
    }

    /**
     * <p>createFailureAlert.</p>
     *
     * @param applicationName   a {@link java.lang.String} object.
     * @param enableTranslation a boolean.
     * @param entityName        a {@link java.lang.String} object.
     * @param errorKey          a {@link java.lang.String} object.
     * @param defaultMessage    a {@link java.lang.String} object.
     * @return a {@link org.springframework.http.HttpHeaders} object.
     */
    @NotNull
    public static HttpHeaders createFailureAlert(String applicationName, boolean enableTranslation, String entityName, String errorKey, String defaultMessage) {
        LOGGER.error("Entity processing failed, {}", defaultMessage);

        String message = enableTranslation ? "error." + errorKey : defaultMessage;

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-" + applicationName + "-error", message);
        headers.add("X-" + applicationName + "-params", entityName);
        return headers;
    }
}
