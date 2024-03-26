package br.com.mac.api.ctb.transacao.config

import com.datastax.driver.core.Cluster
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.core.io.ClassPathResource
import org.testcontainers.containers.GenericContainer
import org.testcontainers.containers.wait.strategy.Wait
import org.testcontainers.shaded.org.apache.commons.lang.StringUtils
import java.io.BufferedReader
import java.net.InetSocketAddress
import java.time.Duration

class CassandraContainerSetup : ApplicationContextInitializer<ConfigurableApplicationContext> {

    override fun initialize(context: ConfigurableApplicationContext) {
        cassandra.setPortBindings(listOf("$cassandraPort:9042"))
        cassandra.waitingFor(Wait.forListeningPort().withStartupTimeout(Duration.ofSeconds(60)))
        cassandra.start()

        val cluster = Cluster.builder()
                .addContactPoint("localhost")
                .withPort(9042)
                .withoutJMXReporting()
                .build()

        val session = cluster.connect()

        val resource = ClassPathResource("ledger.cql")
        BufferedReader(resource.inputStream.reader())
                .readText()
                .split(";")
                .map { StringUtils.normalizeSpace(it) }
                .filter { it.isNotBlank() }
                .forEach { session.execute(it) }

        session.close()
    }

    companion object {
        private const val cassandraPort = 9042

        val cassandra: GenericContainer<*> = GenericContainer<Nothing>("cassandra:3.11.5")
                .withExposedPorts(9042)
    }


}
