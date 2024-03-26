package br.com.mac.api.ajuste.financeiro.cucumber;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static java.lang.ThreadLocal.withInitial;

public enum CucumberTestContext {
    CONTEXT;

    private static final String PAYLOAD = "PAYLOAD";
    private static final String REQUEST = "REQUEST";
    private static final String RESPONSE = "RESPONSE";

    private final ThreadLocal<Map<String, Object>> threadLocal = withInitial(HashMap::new);

    private Map<String, Object> testContextMap() {
        return threadLocal.get();
    }

    public void set(String key, Object value) {
        testContextMap().put(key, value);
    }

    public Object get(String key) {
        return testContextMap().get(key);
    }

    public <T> T get(String key, Class<T> clazz) {
        return clazz.cast(testContextMap().get(key));
    }

    public Object getPayload() {
        return testContextMap().get(PAYLOAD);
    }

    public void setPayload(Object value) {
        set(PAYLOAD, value);
    }

    public <T> T getPayload(Class<T> clazz) {
        return get(PAYLOAD, clazz);
    }

    public RequestSpecification getRequest() {
        RequestSpecification req = get(REQUEST, RequestSpecification.class);
        return (null == req) ? given() : req;
    }

    public Response getResponse() {
        return get(RESPONSE, Response.class);
    }

    public void setResponse(Response response) {
        set(RESPONSE, response);
    }

    public void reset() {
        testContextMap().clear();
    }

}
