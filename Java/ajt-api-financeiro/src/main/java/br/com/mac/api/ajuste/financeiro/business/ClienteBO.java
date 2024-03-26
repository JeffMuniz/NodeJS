package br.com.mac.api.ajuste.financeiro.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotImplementedException;
import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import br.com.mac.api.ajuste.financeiro.repository.ClienteRepository;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import lombok.NonNull;

/**
 * Classe que representa as regras de negocio referente a cliente
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Service
public class ClienteBO {

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    public ClienteEntity buscaOuIncluiCliente(@NonNull TipoEnum tipo,
                                              @NonNull String nome,
                                              String cnpj,
                                              String cpf,
                                              OperacaoEnum operacaoEnum,
                                              Integer idConta,
                                              String descricaoConta) {
        if (TipoEnum.EC.equals(tipo)) {
            return this.buscaOuIncluiEC(nome, cnpj);
        } else if (TipoEnum.PORTADOR.equals(tipo)) {
            return this.buscaOuIncluiPortador(nome, cpf, idConta, descricaoConta);
        } else if (TipoEnum.RH.equals(tipo) && OperacaoEnum.CREDITO.equals(operacaoEnum)) {
            return this.buscaOuIncluiRh(nome, cnpj, idConta, descricaoConta);
        } else {
            throw new NotImplementedException(ExceptionsMessagesEnum.TIPO_NAO_IMPLEMENTADO.getMessage());
        }
    }

    @Transactional
    public ClienteEntity buscaOuIncluiEC(@NonNull String nome, @NonNull String cnpj) {
        final var cliente = this.clienteRepository.findByCnpj(cnpj);
        return cliente == null
                ? this.clienteRepository.save(ClienteEntity.builder()
                .cnpj(new CryptTransformImpl().encryptCnpjWithNoMask(cnpj))
                .nome(nome)
                .build()) : cliente;
    }

    @Transactional
    public ClienteEntity buscaOuIncluiPortador(@NonNull String nome,
                                               @NonNull String cpf,
                                               @NonNull Integer idConta,
                                               @NonNull String descricaoConta) {
        ClienteEntity cliente = this.clienteRepository.findByCpfAndConta(cpf, idConta);
        cliente = this.clienteRepository.save(ClienteEntity.builder()
                .id(cliente == null ? null : cliente.getId())
                .cpf(new CryptTransformImpl().encryptCpfWithNoMask(cpf))
                .nome(nome)
                .idConta(idConta)
                .descricaoConta(descricaoConta)
                .build());
        return cliente;
    }
    
    @Transactional
    public ClienteEntity buscaOuIncluiRh(@NonNull String nome,
                                               @NonNull String cnpj,
                                               @NonNull Integer idConta,
                                               @NonNull String descricaoConta) {

    	String encriptCnpj = new CryptTransformImpl().encryptCnpjWithNoMask(cnpj);
    	ClienteEntity cliente;
        cliente = this.clienteRepository.findByCnpjAndConta(encriptCnpj, idConta);
        cliente = this.clienteRepository.save(ClienteEntity.builder()
                .id(cliente == null ? null : cliente.getId())
                .cnpj(encriptCnpj)
                .nome(nome)
                .idConta(idConta)
                .descricaoConta(descricaoConta)
                .build());
        return cliente;
    }

}
