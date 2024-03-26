package br.com.mac.api.ajuste.financeiro.business;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.persistence.TipoEntity;
import br.com.mac.api.ajuste.financeiro.repository.TipoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Classe que representa as regras de negocio referente a tipo de operacao
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Service
public class TipoOperacaoBO {

    private final TipoRepository tipoRepository;

    public TipoOperacaoBO(TipoRepository tipoRepository) {
        this.tipoRepository = tipoRepository;
    }

    @Transactional
    public TipoEntity buscaTipoOperacao(Integer idTipoOperacao) {
        return tipoRepository.findByIdTipo(idTipoOperacao)
                .orElseThrow(() -> new NotFoundException(ExceptionsMessagesEnum.TIPO_OPERACAO_NAO_ENCONTRADO.getMessage()));
    }


}
