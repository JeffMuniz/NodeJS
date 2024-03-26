package br.com.mac.reports.mq.config;

//import io.vertx.rabbitmq.RabbitMQOptions;
import io.vertx.rabbitmq.RabbitMQOptions;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RabbitMQConfig {

    @ConfigProperty(name = "quarkus.mac.rabbit.host")
    String rabbitHost;
    @ConfigProperty(name = "quarkus.mac.rabbit.port")
    String rabbitPort;
    @ConfigProperty(name = "quarkus.mac.rabbit.user")
    String rabbitUser;
    @ConfigProperty(name = "quarkus.mac.rabbit.password")
    String rabbitPassword;
    @ConfigProperty(name = "quarkus.mac.rabbit.virtual.host")
    String rabbitVirtualHost;
    @ConfigProperty(name = "quarkus.mac.rabbit.virtual.protocol", defaultValue = "amqps://")
    String protocol;

    public RabbitMQOptions configure() {

        RabbitMQOptions config = new RabbitMQOptions();
        config.setUser(rabbitUser);
        config.setPassword(rabbitPassword);
        config.setHost(rabbitHost);
        config.setPort(Integer.parseInt(rabbitPort));
        config.setVirtualHost(rabbitVirtualHost);
        config.setConnectionTimeout(6000);
        config.setUri(protocol + rabbitUser + ":" + rabbitPassword + "@" + rabbitHost + ":" + rabbitPort + "/" + rabbitVirtualHost);
        config.setRequestedHeartbeat(60);
        config.setHandshakeTimeout(6000);
        config.setRequestedChannelMax(5);
        config.setNetworkRecoveryInterval(500);
        config.setAutomaticRecoveryEnabled(true);
        return config;
    }
}
