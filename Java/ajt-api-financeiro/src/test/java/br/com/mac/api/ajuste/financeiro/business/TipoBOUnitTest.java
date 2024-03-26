package br.com.mac.api.ajuste.financeiro.business;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.persistence.TipoEntity;
import br.com.mac.api.ajuste.financeiro.repository.TipoRepository;
import br.com.mac.api.ajuste.financeiro.util.MockTest;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

/**
 * Classe de teste unitario dos servicos de TipoBO
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class TipoBOUnitTest {

    @Mock
    private TipoRepository tipoRepo;

    @InjectMocks
    private TipoOperacaoBO tipoBO;

    /**
     * Testa tipo de operacao nao encontrado
     */
    @Test(expected = NotFoundException.class)
    public void tipoNaoEncontrado() {
    	try {
            this.tipoBO.buscaTipoOperacao(MockTest.ANY_INT);
        }catch (Exception e) {
    		Assert.assertTrue(e.getMessage().contains(
    				ExceptionsMessagesEnum.TIPO_OPERACAO_NAO_ENCONTRADO.getMessage()));
    		throw e;
		}
    }

    /**
     * Testa a pesquisa de tipo de operacao
     */
    @Test
    public void tipoEncontrado() {
        Mockito.when(this.tipoRepo.findByIdTipo(MockTest.ANY_INT)).thenReturn(
                MockTest.mockTipoEntity(TipoEnum.getEnum("EC")));
        TipoEntity tipoEntity = this.tipoBO.buscaTipoOperacao(MockTest.ANY_INT);
        Assert.assertNotNull(tipoEntity);
    }


}
