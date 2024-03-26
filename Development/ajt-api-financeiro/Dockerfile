FROM 123721783999.dkr.ecr.sa-east-1.amazonaws.com/macvisacard:jdk11-alpine as builder

RUN apk update && apk add --no-cache wget

RUN wget https://repo1.maven.org/maven2/co/elastic/apm/elastic-apm-agent/1.16.0/elastic-apm-agent-1.16.0.jar

# -- END OF BUILDER STAGE

FROM 123721783999.dkr.ecr.sa-east-1.amazonaws.com/macvisacard:jdk11-alpine

ENV USER=appuser
ENV UID=16000
ENV GID=16001

RUN mkdir -p app/trace  && \
    addgroup -g $GID $USER && \
    adduser --disabled-password --gecos "" --home /app --ingroup $USER --no-create-home --uid $UID $USER && \
    chown $USER:$USER -R /app 

WORKDIR /app

COPY --chown=appuser:appuser ./target/*.jar ./app.jar

COPY --from=builder --chown=appuser:appuser /elastic-apm-agent-1.16.0.jar ./apm.jar

USER appuser

ENTRYPOINT ["java", "-javaagent:apm.jar", "-Delastic.apm.service_name=ajt-api-financeiro", "-Delastic.apm.server_urls=http://172.31.23.81:8200", "-Delastic.apm.secret_token=", "-Delastic.apm.application_packages=br.com.mac.api.ajuste.financeiro", "-jar", "app.jar"]
