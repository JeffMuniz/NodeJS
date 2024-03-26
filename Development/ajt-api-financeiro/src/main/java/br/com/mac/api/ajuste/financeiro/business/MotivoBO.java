package br.com.mac.api.ajuste.financeiro.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;
import br.com.mac.api.ajuste.financeiro.repository.MotivoRepository;
import br.com.mac.api.ajuste.financeiro.repository.filter.AjusteMotivoDynamicQuery;
import br.com.mac.api.ajuste.financeiro.util.GenerationDynamicQuery;
import br.com.mac.api.ajuste.financeiro.web.api.dto.AjusteMotivoQueryParamsDto;

/**
 * Classe que representa as regras de negocio referente ao motivo de ajuste
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Service
public class MotivoBO {

    @Autowired
    private MotivoRepository motivoRepository;
    
    @Autowired
	private AjusteMotivoDynamicQuery ajusteMotivoDynamicQuery;

    @Transactional
    public MotivoEntity buscaMotivo(Integer idMotivo) {
        return motivoRepository.findByIdMotivo(idMotivo)
                .orElseThrow(() -> new NotFoundException(
                        ExceptionsMessagesEnum.MOTIVO_NAO_ENCONTRADO.getMessage()));
    }

    public List<MotivoEntity> buscaMotivos(AjusteMotivoQueryParamsDto ajusteMotivoQueryParamsDto) {
        return motivoRepository
        			.findAll(GenerationDynamicQuery.run(ajusteMotivoQueryParamsDto, ajusteMotivoDynamicQuery))
        			.orElseThrow(() -> new NotFoundException(ExceptionsMessagesEnum.MOTIVO_NAO_ENCONTRADO.getMessage()));
    }

}
