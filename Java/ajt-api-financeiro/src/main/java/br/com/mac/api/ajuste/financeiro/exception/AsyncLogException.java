package br.com.mac.api.ajuste.financeiro.exception;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class AsyncLogException {
	
	@Async
	public void logAsync(Throwable t) {
		log.error(t.getMessage(), t);
	}

}
