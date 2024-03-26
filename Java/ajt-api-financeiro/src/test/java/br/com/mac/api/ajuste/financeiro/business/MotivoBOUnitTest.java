package br.com.mac.api.ajuste.financeiro.business;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;
import br.com.mac.api.ajuste.financeiro.repository.MotivoRepository;
import br.com.mac.api.ajuste.financeiro.util.MockTest;

/**
 * Classe de teste unitario dos servicos de MotivoBO
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class MotivoBOUnitTest {

    @Mock
    private MotivoRepository motivoRepo;

    @InjectMocks
    private MotivoBO motivoBO;

    /**
     * Testa motivo nao encontrado
     */
    @Test(expected = NotFoundException.class)
    public void motivoNaoEncontrado() {
    	try {
            this.motivoBO.buscaMotivo(MockTest.ANY_INT);
        }catch (Exception e) {
    		Assert.assertTrue(e.getMessage().contains(
    				ExceptionsMessagesEnum.MOTIVO_NAO_ENCONTRADO.getMessage()));
    		throw e;
		}
    }
    
    /**
     * Testa a pesquisa de motivo
     */
    @Test
    public void motivoEncontrado() {
        Mockito.when(this.motivoRepo.findByIdMotivo(MockTest.ANY_INT)).thenReturn(
                MockTest.mockMotivoEntity());
        MotivoEntity motivoEntity = this.motivoBO.buscaMotivo(MockTest.ANY_INT);
        Assert.assertNotNull(motivoEntity);
    }
    


}
