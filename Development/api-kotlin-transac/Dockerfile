FROM macdevcr.azurecr.io/sciensa/jdk11:alpine

RUN apk add curl

RUN mkdir -p /opt/datadog-agent &&\
cd /opt/datadog-agent &&\
curl -L -O https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent/0.59.0/dd-java-agent-0.59.0.jar

WORKDIR /usr/src/mac-api-funcionario/

COPY ./target/*.jar /usr/src/mac-api-funcionario/mac-api-funcionario.jar

CMD ["java", "-javaagent:/opt/datadog-agent/dd-java-agent-0.59.0.jar", "-Ddd.agent.host=lb-datadog.dd-agent", "-Ddd.trace.agent.port=8126", "-Ddd.trace.analytics.enabled=true", "-Ddd.service=mac-api-func", "-Ddd.env=prod-blue", "-jar", "/usr/src/mac-api-funcionario/mac-api-funcionario.jar"]