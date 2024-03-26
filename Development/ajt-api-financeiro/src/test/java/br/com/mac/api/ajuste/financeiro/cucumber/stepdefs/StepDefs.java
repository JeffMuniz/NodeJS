package br.com.mac.api.ajuste.financeiro.cucumber.stepdefs;

import br.com.mac.api.ajuste.financeiro.cucumber.CucumberTestContext;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.Map;

public abstract class StepDefs {

    private static final Logger LOGGER = LoggerFactory.getLogger(StepDefs.class);

    private final CucumberTestContext context = CucumberTestContext.CONTEXT;

    @LocalServerPort
    private int port;

    protected String baseUrl() {
        return "http://localhost:" + port;
    }

    protected CucumberTestContext testContext() {
        return context;
    }

    protected void executePost(String apiPath) {
        executePost(apiPath, null, null);
    }

    protected void executePost(String apiPath, Map<String, String> pathParams) {
        executePost(apiPath, pathParams, null);
    }

    protected void executePost(String apiPath, Map<String, String> pathParams, Map<String, String> queryParamas) {
        final RequestSpecification request = context.getRequest();
        final Object payload = context.getPayload();
        final String url = baseUrl() + apiPath;

        setPayload(request, payload);
        setQueryParams(pathParams, request);
        setPathParams(queryParamas, request);

        Response response = request.accept(ContentType.JSON)
                .log()
                .all()
                .post(url);

        logResponse(response);

        context.setResponse(response);
    }

    protected void executeMultiPartPost(String apiPath) {
        final RequestSpecification request = context.getRequest();
        final Object payload = context.getPayload();
        final String url = baseUrl() + apiPath;

        Response response = request.multiPart("fuelTransfer", payload, "application/json")
                .log()
                .all()
                .post(url);

        logResponse(response);
        context.setResponse(response);
    }

    protected void executeDelete(String apiPath) {
        executeDelete(apiPath, null, null);
    }

    protected void executeDelete(String apiPath, Map<String, String> pathParams) {
        executeDelete(apiPath, pathParams, null);
    }

    protected void executeDelete(String apiPath, Map<String, String> pathParams, Map<String, String> queryParams) {
        final RequestSpecification request = context.getRequest();
        final Object payload = context.getPayload();
        final String url = baseUrl() + apiPath;

        setPayload(request, payload);
        setQueryParams(pathParams, request);
        setPathParams(queryParams, request);

        Response response = request.accept(ContentType.JSON)
                .log()
                .all()
                .delete(url);

        logResponse(response);
        context.setResponse(response);
    }

    protected void executePut(String apiPath) {
        executePut(apiPath, null, null);
    }

    protected void executePut(String apiPath, Map<String, String> pathParams) {
        executePut(apiPath, pathParams, null);
    }

    protected void executePut(String apiPath, Map<String, String> pathParams, Map<String, String> queryParams) {
        final RequestSpecification request = context.getRequest();
        final Object payload = context.getPayload();
        final String url = baseUrl() + apiPath;

        setPayload(request, payload);
        setQueryParams(pathParams, request);
        setPathParams(queryParams, request);

        Response response = request.accept(ContentType.JSON)
                .log()
                .all()
                .put(url);

        logResponse(response);
        context.setResponse(response);
    }

    protected void executePatch(String apiPath) {
        executePatch(apiPath, null, null);
    }

    protected void executePatch(String apiPath, Map<String, String> pathParams) {
        executePatch(apiPath, pathParams, null);
    }

    protected void executePatch(String apiPath, Map<String, String> pathParams, Map<String, String> queryParams) {
        final RequestSpecification request = context.getRequest();
        final Object payload = context.getPayload();
        final String url = baseUrl() + apiPath;

        setPayload(request, payload);
        setQueryParams(pathParams, request);
        setPathParams(queryParams, request);

        Response response = request.accept(ContentType.JSON)
                .log()
                .all()
                .patch(url);

        logResponse(response);
        context.setResponse(response);
    }

    protected void executeGet(String apiPath) {
        executeGet(apiPath, "xxx", null, null);
    }

    protected void executeGet(String apiPath, Map<String, String> pathParams) {
        executeGet(apiPath, "xxx", pathParams, null);
    }

    protected void executeGet(String apiPath, String authorization, Map<String, String> pathParams, Map<String, String> queryParams) {
        final RequestSpecification request = context.getRequest();
        final String url = baseUrl() + apiPath;

        setHeader(authorization, request);
        setQueryParams(pathParams, request);
        setPathParams(queryParams, request);

        Response response = request.accept(ContentType.JSON)
                .log()
                .all()
                .get(url);

        logResponse(response);
        context.setResponse(response);
    }

    private void logResponse(Response response) {
        response.then()
                .log()
                .all();
    }

    private void setHeader(String authorization, RequestSpecification request) {
        if (null != authorization) {
            request.header(new Header("Authorization", authorization));
        }
    }
    
    private void setPathParams(Map<String, String> queryParamas, RequestSpecification request) {
        if (null != queryParamas) {
            request.queryParams(queryParamas);
        }
    }

    private void setQueryParams(Map<String, String> pathParams, RequestSpecification request) {
        if (null != pathParams) {
            request.pathParams(pathParams);
        }
    }

    private void setPayload(RequestSpecification request, Object payload) {
        if (null != payload) {
            request.contentType(ContentType.JSON)
                    .body(payload);
        }
    }
}
