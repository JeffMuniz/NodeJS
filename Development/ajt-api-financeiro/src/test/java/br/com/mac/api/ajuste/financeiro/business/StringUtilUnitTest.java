package br.com.mac.api.ajuste.financeiro.business;

import br.com.mac.api.ajuste.financeiro.util.StringUtil;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

import java.math.BigDecimal;

/**
 * Classe de teste unitario dos metodos de formatacao
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class StringUtilUnitTest {

    /**
     * Testa a remocao de caracteres especiais
     */
    @Test
    public void removerCaracterEspeciais() {
        String valorEnviado = "213.asda,62;3/sk:dsaz'asakd=dd";
        String valorEsperado = "213asda623skdsazasakddd";
        Assert.assertEquals(valorEsperado, StringUtil.removerCaracterEspeciais(valorEnviado));
    }

    /**
     * Testa para formatar cnpj ja formatado
     */
    @Test
    public void formataCnpjJaFormatado() {
        String valorEnviado = "22.006.830/0001-20";
        String valorEsperado = "22.006.830/0001-20";
        Assert.assertEquals(valorEsperado, StringUtil.formataCnpj(valorEnviado));
    }

    /**
     * Testa para formatar cnpj parte formatado
     */
    @Test
    public void formataCnpjParteFormatado() {
        String valorEnviado = "22.0068300001-20";
        String valorEsperado = "22.006.830/0001-20";
        Assert.assertEquals(valorEsperado, StringUtil.formataCnpj(valorEnviado));
    }

    /**
     * Testa para formatar cnpj nao formatado
     */
    @Test
    public void formataCnpjNaoFormatado() {
        String valorEnviado = "22006830000120";
        String valorEsperado = "22.006.830/0001-20";
        Assert.assertEquals(valorEsperado, StringUtil.formataCnpj(valorEnviado));
    }

    /**
     * Testa para formatar cnpj nao formatado com 0 a esquerda
     */
    @Test
    public void formataCnpjNaoFormatadoZeroEsquerda() {
        String valorEnviado = "02006830000120";
        String valorEsperado = "02.006.830/0001-20";
        Assert.assertEquals(valorEsperado, StringUtil.formataCnpj(valorEnviado));
    }

    /**
     * Testa para formatar cnpj nao formatado com 0 a esquerda
     */
    @Test
    public void formataCnpjNaoFormatadoSemZeroEsquerda() {
        String valorEnviado = "2006830000120";
        String valorEsperado = "02.006.830/0001-20";
        Assert.assertEquals(valorEsperado, StringUtil.formataCnpj(valorEnviado));
    }

    /**
     * Testa para formatar cnpj incorreto
     */
    @Test
    public void formataCnpjIncorreto() {
        String valorEnviado = "220068300001209999";
        String valorEsperado = "";
        Assert.assertEquals(valorEsperado, StringUtil.formataCnpj(valorEnviado));
    }

    /**
     * Testa para formatar cpf ja formatado
     */
    @Test
    public void formataCpfJaFormatado() {
        String valorEnviado = "407.354.827-07";
        String valorEsperado = "407.354.827-07";
        Assert.assertEquals(valorEsperado, StringUtil.formataCpf(valorEnviado));
    }

    /**
     * Testa para formatar cpf parte formatado
     */
    @Test
    public void formataCpfParteFormatado() {
        String valorEnviado = "407354827-07";
        String valorEsperado = "407.354.827-07";
        Assert.assertEquals(valorEsperado, StringUtil.formataCpf(valorEnviado));
    }

    /**
     * Testa para formatar cpf nao formatado
     */
    @Test
    public void formataCpfNaoFormatado() {
        String valorEnviado = "40735482707";
        String valorEsperado = "407.354.827-07";
        Assert.assertEquals(valorEsperado, StringUtil.formataCpf(valorEnviado));
    }

    /**
     * Testa para formatar cpf incorreto
     */
    @Test
    public void formataCpfIncorreto() {
        String valorEnviado = "407354827079999";
        String valorEsperado = "";
        Assert.assertEquals(valorEsperado, StringUtil.formataCpf(valorEnviado));
    }

    /**
     * Testa para formatar cpf nao formatado com 0 a esquerda
     */
    @Test
    public void formataCpfNaoFormatadoZeroEsquerda() {
        String valorEnviado = "03827392608";
        String valorEsperado = "038.273.926-08";
        Assert.assertEquals(valorEsperado, StringUtil.formataCpf(valorEnviado));
    }

    /**
     * Testa para formatar cpf nao formatado com 0 a esquerda
     */
    @Test
    public void formataCpfNaoFormatadoSemZeroEsquerda() {
        String valorEnviado = "3827392608";
        String valorEsperado = "038.273.926-08";
        Assert.assertEquals(valorEsperado, StringUtil.formataCpf(valorEnviado));
    }


    /**
     * Testa valor real sem casa decimal
     */
    @Test
    public void formataValorRealSemCasaDecimal() {
        String valorEnviado = "20";
        String valorEsperado = "R$ 20,00";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }

    /**
     * Testa valor real com uma casa decimal
     */
    @Test
    public void formataValorRealComUmaCasaDecimal() {
        String valorEnviado = "20.1";
        String valorEsperado = "R$ 20,10";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }

    /**
     * Testa valor real com duas casas decimais
     */
    @Test
    public void formataValorRealComDuasCasaDecimal() {
        String valorEnviado = "20.11";
        String valorEsperado = "R$ 20,11";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }


    /**
     * Testa valor real com três casas decimais
     */
    @Test
    public void formataValorRealComTresCasasDecimais() {
        String valorEnviado = "20.119";
        String valorEsperado = "R$ 20,12";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }

    /**
     * Testa valor real com quatro casas decimais
     */
    @Test
    public void formataValorRealComQuadroCasasDecimais() {
        String valorEnviado = "20.1111";
        String valorEsperado = "R$ 20,11";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }

    /**
     * Testa valor real com numero inteiro com um separador
     */
    @Test
    public void formataValorRealNumeroInteiroComUmSeparador() {
        String valorEnviado = "1000.99";
        String valorEsperado = "R$ 1.000,99";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }

    /**
     * Testa valor real com numero inteiro com dois separador
     */
    @Test
    public void formataValorRealNumeroInteiroComDoisSeparador() {
        String valorEnviado = "192920000.99";
        String valorEsperado = "R$ 192.920.000,99";
        Assert.assertEquals(valorEsperado, StringUtil.formataValorReal(new BigDecimal(valorEnviado)));
    }

}
