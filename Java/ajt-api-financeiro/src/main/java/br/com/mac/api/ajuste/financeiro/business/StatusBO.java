package br.com.mac.api.ajuste.financeiro.business;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.persistence.StatusEntity;
import br.com.mac.api.ajuste.financeiro.repository.StatusRepository;
import lombok.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StatusBO {

    private final StatusRepository statusRepository;

    public StatusBO(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Transactional
    public StatusEntity buscaStatus(@NonNull Integer statusId) {
        return statusRepository.findById(statusId)
                .orElseThrow(() -> new NotFoundException(ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage()));
    }


}
