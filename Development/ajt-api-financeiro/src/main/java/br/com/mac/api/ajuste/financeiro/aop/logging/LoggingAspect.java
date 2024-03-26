package br.com.mac.api.ajuste.financeiro.aop.logging;

import br.com.mac.api.ajuste.financeiro.config.LogInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.searchbox.client.JestClient;
import io.searchbox.client.JestResult;
import io.searchbox.client.JestResultHandler;
import io.searchbox.core.DocumentResult;
import io.searchbox.core.Index;
import io.searchbox.indices.CreateIndex;
import io.searchbox.indices.IndicesExists;
import org.apache.commons.codec.digest.DigestUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.InetAddress;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Classe LogAspect - aspecto que intercepta as chamadas para gravacao de log
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@Aspect
public class LoggingAspect {

    /**
     * Constante logger.
     */
    private final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    private final Environment env;
    private final JestClient jestClient;
    private final ObjectMapper jsonObjectMapper;
    @Value("${integration.elasticsearch.active}")
    private Boolean integrationElasticsearchActive;
    @Value("${integration.elasticsearch.index}")
    private String integrationElasticsearchIndex;
    @Value("${info.build.artifact}")
    private String infoBuildArtifact;

    public LoggingAspect(Environment env, JestClient jestClient, @Qualifier("jsonObjectMapper") ObjectMapper jsonObjectMapper) {
        this.env = env;
        this.jestClient = jestClient;
        this.jsonObjectMapper = jsonObjectMapper;
    }

    /**
     * Intercepta chamadas de APIs para gravacao de informacoes do log
     *
     * @param joinPoint - dados da chamada
     *
     * @return resposta do servico
     *
     * @throws Throwable - erro interno
     */
    @Around("applicationPackagePointcut() && springBeanPointcut()")
    public Object aroundMethod(@NotNull ProceedingJoinPoint joinPoint) throws Throwable {
        Logger logger = logger(joinPoint);

        ZonedDateTime startZonedDateTime = ZonedDateTime.now(ZoneId.systemDefault());

        LogInfo logInfo = new LogInfo();
        logInfo.setClasse(joinPoint.getSignature().getDeclaringType().getName());
        logInfo.setArgs(jsonObjectMapper.writeValueAsString(getArgsMap(joinPoint)));
        logInfo.setNomeServidor(InetAddress.getLocalHost().getHostName());
        logInfo.setIp(InetAddress.getLocalHost().getHostAddress());
        logInfo.setMetodo(joinPoint.getSignature().getName());
        logInfo.setApi(infoBuildArtifact);

        if (logger.isInfoEnabled()) {
            logInfo.setMomento(LogInfo.Momento.INICIO);
            sendLogToElasticsearch(logInfo);
        }
        try {
            Object result = joinPoint.proceed();
            if (logger.isInfoEnabled()) {
                logInfo.setMomento(LogInfo.Momento.TERMINO);
                logInfo.setTempoResposta(ChronoUnit.MILLIS.between(startZonedDateTime, ZonedDateTime.now(ZoneId.systemDefault())));
                logInfo.setStatus(((ResponseEntity<?>) result).getStatusCodeValue());
                sendLogToElasticsearch(logInfo);
            }
            return result;
        } catch (IllegalArgumentException e) {
            logInfo.setMomento(LogInfo.Momento.TERMINO);
            logInfo.setTempoResposta(ChronoUnit.MILLIS.between(startZonedDateTime, ZonedDateTime.now(ZoneId.systemDefault())));
            logInfo.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            logInfo.setErro(geradorUUID() + " - " + e.getMessage());
            sendLogToElasticsearch(logInfo);
            throw e;
        }
    }

    /**
     * Verifica se o metodo e um rest.
     */
    @Pointcut("within(@org.springframework.stereotype.Repository *)" +
            " || within(@org.springframework.stereotype.Service *)" +
            " || within(@org.springframework.web.bind.annotation.RestController *)" +
            " || within(@org.springframework.stereotype.Controller *)")
    public void springBeanPointcut() {
        // Empty body
    }

    @Pointcut("within(br.com.mac.api.ajuste.financeiro.web.api..*)")
    public void applicationPackagePointcut() {
        // Empty body
    }

    public static Map<String, Object> getArgsMap(JoinPoint pjp) {
        MethodSignature signature = (MethodSignature) pjp.getSignature();
        Map<String, Object> args = new LinkedHashMap<>();
        String[] names = signature.getParameterNames();
        for (int i = 0, len = names.length; i < len; i++) {
            args.put(names[i], pjp.getArgs()[i]);
        }
        return args;
    }

    /**
     * Retrieves the {@link Logger} associated to the given {@link JoinPoint}.
     *
     * @param joinPoint join point we want the logger for.
     *
     * @return {@link Logger} associated to the given {@link JoinPoint}.
     */
    private Logger logger(JoinPoint joinPoint) {
        return LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringTypeName());
    }

    private void sendLogToElasticsearch(LogInfo logInfo) {
        logInfo.setData(ZonedDateTime.now(ZoneId.systemDefault()));

        if (integrationElasticsearchActive && jestClient != null) {
            jestClient.executeAsync(new IndicesExists.Builder(integrationElasticsearchIndex).build(), new JestResultHandler<JestResult>() {
                @Override
                public void completed(JestResult jestResult) {
                    if (!jestResult.isSucceeded()) {
                        try {
                            JestResult result = jestClient.execute(new CreateIndex.Builder(integrationElasticsearchIndex).build());
                            if (result.isSucceeded()) {
                                logger.info("Índice criado com sucesso.");
                            } else {
                                logger.info(result.getErrorMessage());
                            }
                        } catch (IOException e) {
                            logger.error(e.getMessage(), e);
                        }
                    } else {
                        logger.info("Índice já existente.");
                    }

                    try {
                        jestClient.executeAsync(new Index.Builder(jsonObjectMapper.writeValueAsString(logInfo)).index(integrationElasticsearchIndex).type(LogInfo.class.getSimpleName()).build(), new JestResultHandler<DocumentResult>() {
                            @Override
                            public void completed(DocumentResult documentResult) {
                                if (documentResult.isSucceeded()) {
                                    logger.info("Documento criado com sucesso: {}", documentResult.getJsonString());
                                } else {
                                    logger.error("Erro ao criar documento: {}", documentResult.getErrorMessage());
                                }
                            }

                            @Override
                            public void failed(Exception e) {
                                logger.error(e.getMessage(), e);
                            }
                        });
                    } catch (JsonProcessingException e) {
                        logger.error(e.getMessage(), e);
                    }
                }

                @Override
                public void failed(Exception e) {
                    logger.error(e.getMessage(), e);
                }
            });
        }
    }

    /**
     * Gera um id unico
     *
     * @return codigo unico
     */
    public String geradorUUID() {
        return DigestUtils.sha1Hex(System.currentTimeMillis() + UUID.randomUUID().toString());
    }
}
