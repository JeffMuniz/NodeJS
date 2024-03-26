package br.com.mac.api.ajuste.financeiro.business;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.persistence.StatusEntity;
import br.com.mac.api.ajuste.financeiro.repository.StatusRepository;
import br.com.mac.api.ajuste.financeiro.util.MockTest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

/**
 * Classe de teste unitario dos servicos de StatusBO
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class StatusBOUnitTest {

    @Mock
    private StatusRepository statusRepo;

    @InjectMocks
    private StatusBO statusBO;

    /**
     * Testa status nao encontrado
     */
    @Test(expected = NotFoundException.class)
    public void statusNaoEncontrado() {
    	try {
            this.statusBO.buscaStatus(MockTest.ANY_INT);
        }catch (Exception e) {
    		Assert.assertTrue(e.getMessage().contains(
    				ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage()));
    		throw e;
		}
    }

    /**
     * Testa a pesquisa de status
     */
    @Test
    public void statusEncontrado() {
        Mockito.when(this.statusRepo.findById(MockTest.ANY_INT)).thenReturn(
                MockTest.mockStatusEntity());
        StatusEntity statusEntity = this.statusBO.buscaStatus(MockTest.ANY_INT);
        Assert.assertNotNull(statusEntity);
    }
}
