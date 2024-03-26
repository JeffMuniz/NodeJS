package br.com.mac.wkr.ctb.atutransacao.container

import com.datastax.driver.core.Cluster
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.core.io.ClassPathResource
import org.testcontainers.containers.GenericContainer
import org.testcontainers.containers.wait.strategy.LogMessageWaitStrategy
import org.testcontainers.shaded.org.apache.commons.lang.StringUtils
import java.io.BufferedReader

class ElassandraContainerSetup : ApplicationContextInitializer<ConfigurableApplicationContext> {

    override fun initialize(context: ConfigurableApplicationContext) {
        elassandra.addEnv("CASSANDRA_DAEMON", "org.apache.cassandra.service.CassandraDaemon")
        elassandra.setPortBindings(listOf("9042:9042"))
        elassandra.start()
        elassandra.waitingFor(LogMessageWaitStrategy().withRegEx("Elassandra started"))

        val cluster = Cluster.builder()
                .addContactPoints("localhost")
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
        val elassandra: GenericContainer<*> = GenericContainer<Nothing>("strapdata/elassandra:6.8.4")
                .withExposedPorts(9042)
    }
}
