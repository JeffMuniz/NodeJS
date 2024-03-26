FROM 123721783999.dkr.ecr.sa-east-1.amazonaws.com/maquiinaedu:jdk11-alpine as newrelic-downloader

RUN apk update && apk add --no-cache wget unzip

RUN wget https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-java.zip && \
    unzip newrelic-java.zip

# -- END OF BUILDER STAGE

FROM 123721783999.dkr.ecr.sa-east-1.amazonaws.com/maquiinaedu:jdk11-alpine

ENV USER=appuser
ENV UID=16000
ENV GID=16001

RUN mkdir -p app/trace  && \
    addgroup -g $GID $USER && \
    adduser --disabled-password --gecos "" --home /app --ingroup $USER --no-create-home --uid $UID $USER && \
    chown $USER:$USER -R /app 
    
RUN mkdir -p /app

WORKDIR /app

COPY --chown=appuser:appuser --from=newrelic-downloader ./newrelic/newrelic.jar /app
COPY --chown=appuser:appuser ./newrelic.yml /app

COPY --chown=appuser:appuser ./target/*.jar ./app.jar

USER appuser

ENV NEW_RELIC_LOG_FILE_NAME="STDOUT"
ENTRYPOINT ["java", "-javaagent:newrelic.jar", "-jar", "app.jar"]
