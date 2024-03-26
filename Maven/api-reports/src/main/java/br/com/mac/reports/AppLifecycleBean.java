package br.com.mac.reports;

import br.com.mac.reports.mq.config.RabbitMQConfig;
import br.com.mac.reports.mq.publish.RabbitMQPublish;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Vertx;
import io.vertx.rabbitmq.RabbitMQClient;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

@Slf4j
@ApplicationScoped
public class AppLifecycleBean {

    @Inject
    Vertx vertx;

    @Inject
    RabbitMQConfig rabbitMQConfig;

    @Inject
    RabbitMQPublish rabbitMQPublish;

    void onStart(@Observes StartupEvent ev) {
        log.info("The application is starting...");
    }

    void onStop(@Observes ShutdownEvent ev) {
        log.info("The application is stopping...");

        RabbitMQClient rabbitMQClient = RabbitMQClient.create(vertx, rabbitMQConfig.configure());

        rabbitMQClient.stop(asyncResult -> {
            if (asyncResult.succeeded()) {
                log.info("RabbitMQ successfully disconnected!");
            } else {
                log.info("Fail to disconnect to RabbitMQ " + asyncResult.cause().getMessage());
            }
        });
    }

}