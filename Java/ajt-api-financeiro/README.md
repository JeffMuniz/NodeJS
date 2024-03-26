#  Ajuste Financeiro API 
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> API responsável por Ajuste Financeiro

## Desenvolvimento

```sh
./mvnw
```

### Fazendo desenvolvimento API-first usando o openapi-generator

[OpenAPI-Generator]() está configurado para esta aplicação. Você pode gerar o código da API a partir do arquivo de definição `src/main/resources/swagger/api.yml`, executando:

```bash
./mvnw generate-sources
```

Em seguida, implemente as classes delegadas geradas com as classes `@Service`.

Para editar o arquivo de definição `api.yml`, você pode usar uma ferramenta como [Swagger-Editor](https://editor.swagger.io).

## Construindo para produção

### Empacotando como jar

Para construir o jar final e otimizar o aplicação para produção, execute:

    ./mvnw -Pprod clean verify

Para garantir que tudo funcionou, execute:

    java -jar target/*.jar

### Empacotando como war

Para empacotar sua aplicação como um war para implementá-lo em um servidor de aplicativos, execute:

    ./mvnw -Pprod,war clean verify

## Executar testes

```sh
./mvnw clean verify -Dspring.profiles.active=testcontainers
```

### Qualidade do código

O sonar é usado para analisar a qualidade do código. Você pode iniciar um servidor Sonar local (acessível em http://localhost:9001) com:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Você pode executar uma análise do Sonar usando o [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) ou usando o plug-in maven.

Em seguida, execute uma análise do sonar:

```
./mvnw -Pprod -Dspring.profiles.active=testcontainers clean verify sonar:sonar
```

Se você precisar executar novamente a fase do Sonar, certifique-se de especificar pelo menos a fase `initialize`, pois as propriedades do Sonar são carregadas do arquivo sonar-project.properties.

```
./mvnw initialize sonar:sonar
```
