package br.com.mac.api.ajuste.financeiro.util;

import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.classic.spi.LoggerContextListener;
import ch.qos.logback.core.ConsoleAppender;
import ch.qos.logback.core.spi.ContextAwareBase;
import net.logstash.logback.composite.ContextJsonProvider;
import net.logstash.logback.composite.GlobalCustomFieldsJsonProvider;
import net.logstash.logback.composite.loggingevent.ArgumentsJsonProvider;
import net.logstash.logback.composite.loggingevent.LogLevelJsonProvider;
import net.logstash.logback.composite.loggingevent.LoggerNameJsonProvider;
import net.logstash.logback.composite.loggingevent.LoggingEventFormattedTimestampJsonProvider;
import net.logstash.logback.composite.loggingevent.LoggingEventJsonProviders;
import net.logstash.logback.composite.loggingevent.LoggingEventPatternJsonProvider;
import net.logstash.logback.composite.loggingevent.MdcJsonProvider;
import net.logstash.logback.composite.loggingevent.MessageJsonProvider;
import net.logstash.logback.composite.loggingevent.StackTraceJsonProvider;
import net.logstash.logback.composite.loggingevent.ThreadNameJsonProvider;
import net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder;
import net.logstash.logback.stacktrace.ShortenedThrowableConverter;

/**
 * Utility methods to add appenders to a
 * {@link ch.qos.logback.classic.LoggerContext}.
 */
public final class LoggingUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoggingUtils.class);

	private static final String CONSOLE_APPENDER_NAME = "CONSOLE";

	private LoggingUtils() {
	}

	/**
	 * <p>
	 * addJsonConsoleAppender.
	 * </p>
	 *
	 * @param context      a {@link ch.qos.logback.classic.LoggerContext} object.
	 * @param customFields a {@link java.lang.String} object.
	 */
	public static void addJsonConsoleAppender(@NotNull LoggerContext context, String customFields) {
		LOGGER.info("Initializing Console loggingProperties");

		ConsoleAppender<ILoggingEvent> consoleAppender = new ConsoleAppender<>();
		consoleAppender.setContext(context);
		consoleAppender.setEncoder(compositeJsonEncoder(context, customFields));
		consoleAppender.setName(CONSOLE_APPENDER_NAME);
		consoleAppender.start();

		context.getLogger(ch.qos.logback.classic.Logger.ROOT_LOGGER_NAME).detachAppender(CONSOLE_APPENDER_NAME);
		context.getLogger(ch.qos.logback.classic.Logger.ROOT_LOGGER_NAME).addAppender(consoleAppender);
	}

	/**
	 * <p>
	 * addContextListener.
	 * </p>
	 *
	 * @param customFields a {@link java.lang.String} object.
	 */
	public static void addContextListener(@NotNull LoggerContext context, String customFields) {
		LogbackLoggerContextListener loggerContextListener = new LogbackLoggerContextListener(customFields);
		loggerContextListener.setContext(context);
		context.addListener(loggerContextListener);
	}

	@NotNull
	private static LoggingEventCompositeJsonEncoder compositeJsonEncoder(LoggerContext context, String customFields) {
		final LoggingEventCompositeJsonEncoder compositeJsonEncoder = new LoggingEventCompositeJsonEncoder();
		compositeJsonEncoder.setContext(context);
		compositeJsonEncoder.setProviders(jsonProviders(context, customFields));
		compositeJsonEncoder.start();
		return compositeJsonEncoder;
	}

	@NotNull
	private static LoggingEventJsonProviders jsonProviders(LoggerContext context, String customFields) {
		final LoggingEventJsonProviders jsonProviders = new LoggingEventJsonProviders();
		jsonProviders.addArguments(new ArgumentsJsonProvider());
		jsonProviders.addContext(new ContextJsonProvider<>());
		jsonProviders.addGlobalCustomFields(customFieldsJsonProvider(customFields));
		jsonProviders.addLogLevel(new LogLevelJsonProvider());
		jsonProviders.addLoggerName(loggerNameJsonProvider());
		jsonProviders.addMdc(new MdcJsonProvider());
		jsonProviders.addMessage(new MessageJsonProvider());
		jsonProviders.addPattern(new LoggingEventPatternJsonProvider());
		jsonProviders.addStackTrace(stackTraceJsonProvider());
		jsonProviders.addThreadName(new ThreadNameJsonProvider());
		jsonProviders.addTimestamp(timestampJsonProvider());
		jsonProviders.setContext(context);
		return jsonProviders;
	}

	@NotNull
	private static GlobalCustomFieldsJsonProvider<ILoggingEvent> customFieldsJsonProvider(String customFields) {
		final GlobalCustomFieldsJsonProvider<ILoggingEvent> customFieldsJsonProvider = new GlobalCustomFieldsJsonProvider<>();
		customFieldsJsonProvider.setCustomFields(customFields);
		return customFieldsJsonProvider;
	}

	@NotNull
	private static LoggerNameJsonProvider loggerNameJsonProvider() {
		final LoggerNameJsonProvider loggerNameJsonProvider = new LoggerNameJsonProvider();
		loggerNameJsonProvider.setShortenedLoggerNameLength(20);
		return loggerNameJsonProvider;
	}

	@NotNull
	private static StackTraceJsonProvider stackTraceJsonProvider() {
		StackTraceJsonProvider stackTraceJsonProvider = new StackTraceJsonProvider();
		stackTraceJsonProvider.setThrowableConverter(throwableConverter());
		return stackTraceJsonProvider;
	}

	@NotNull
	private static ShortenedThrowableConverter throwableConverter() {
		final ShortenedThrowableConverter throwableConverter = new ShortenedThrowableConverter();
		throwableConverter.setRootCauseFirst(true);
		return throwableConverter;
	}

	@NotNull
	private static LoggingEventFormattedTimestampJsonProvider timestampJsonProvider() {
		final LoggingEventFormattedTimestampJsonProvider timestampJsonProvider = new LoggingEventFormattedTimestampJsonProvider();
		timestampJsonProvider.setTimeZone("UTC");
		timestampJsonProvider.setFieldName("timestamp");
		return timestampJsonProvider;
	}

	/**
	 * Logback configuration is achieved by configuration file and API. When
	 * configuration file change is detected, the configuration is reset. This
	 * listener ensures that the programmatic configuration is also re-applied after
	 * reset.
	 */
	private static class LogbackLoggerContextListener extends ContextAwareBase implements LoggerContextListener {
		private final String customFields;

		private LogbackLoggerContextListener(String customFields) {
			this.customFields = customFields;
		}

		@Override
		public boolean isResetResistant() {
			return true;
		}

		@Override
		public void onStart(LoggerContext loggerContext) {
			// Empty body
		}

		@Override
		public void onReset(@NotNull LoggerContext context) {
			addJsonConsoleAppender(context, customFields);
		}

		@Override
		public void onStop(LoggerContext loggerContext) {
			// Empty body
		}

		@Override
		public void onLevelChange(ch.qos.logback.classic.Logger logger, Level level) {
			// Empty body
		}
	}
}
