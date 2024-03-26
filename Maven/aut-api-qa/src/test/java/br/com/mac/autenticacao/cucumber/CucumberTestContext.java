package br.com.mac.autenticacao.cucumber;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import java.util.HashMap;
import java.util.Map;

public enum CucumberTestContext {
  CONTEXT;

  private static final String PAYLOAD = "PAYLOAD";
  private static final String REQUEST = "REQUEST";
  private static final String RESPONSE = "RESPONSE";

  private final ThreadLocal<Map<String, Object>> threadLocal =
      ThreadLocal.withInitial(HashMap::new);

  public Response getResponse() {
    return get(RESPONSE, Response.class);
  }

  public <T> T get(String key, Class<T> clazz) {
    return clazz.cast(testContextMap().get(key));
  }

  private Map<String, Object> testContextMap() {
    return threadLocal.get();
  }

  public void setResponse(Response response) {
    set(RESPONSE, response);
  }

  public void set(String key, Object value) {
    testContextMap().put(key, value);
  }

  public Object getPayload() {
    return testContextMap().get(PAYLOAD);
  }

  public void setPayload(Object value) {
    set(PAYLOAD, value);
  }

  public RequestSpecification getRequest() {
    return get(REQUEST, RequestSpecification.class);
  }

  public void reset() {
    testContextMap().clear();
  }

}
