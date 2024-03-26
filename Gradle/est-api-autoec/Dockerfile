FROM 957723433972.dkr.ecr.sa-east-1.amazonaws.com/machina:jdk11-alpine

ENV USER=appuser
ENV UID=16000
ENV GID=16001

RUN mkdir -p /app

RUN mkdir -p app/trace  && \
    addgroup -g $GID $USER && \
    adduser --disabled-password --gecos "" --home /app --ingroup $USER --no-create-home --uid $UID $USER && \
    chown $USER:$USER -R /app 

WORKDIR /app

COPY --chown=appuser:appuser build/libs/*.jar /app/est-api-autoec.jar
USER appuser

EXPOSE 8080

CMD java -XX:+UseG1GC -Xms64m -Xmx256m -jar /app/est-api-autoec.jar