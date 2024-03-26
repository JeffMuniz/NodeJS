package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.ctb.entity.AutorizacaoEntity
import java.math.BigDecimal
import java.util.Date

data class Autorizacao(

        var idAutorizacao: Int? = null,
        var cartao: String? = null,
        var cdAutorizacao: String? = null,
        var cdBanco: Short? = null,
        var cdBin: Int? = null,
        var cdBinAdquirente: String? = null,
        var cdProduto: Short? = null,
        var cdRetorno: String? = null,
        var cnpjEstabelecimento: String? = null,
        var cpfPortador: String? = null,
        var dataHora: Date? = null,
        var dcBinAdquirente: String? = null,
        var dcModoEntrada: String? = null,
        var dcProduto: String? = null,
        var dcRetorno: String? = null,
        var dcTecnologia: String? = null,
        var dcTerminal: String? = null,
        var dcTipoTransacao: String? = null,
        var dcTransNeg: String? = null,
        var dcStatus: String? = null,
        var dtAutorizacao: Date? = null,
        var dtTransacao: Date? = null,
        var idCartao: Int? = null,
        var idCompra: Int? = null,
        var idEstabelecimento: String? = null,
        var idPortador: Int? = null,
        var nmEstabelecimento: String? = null,
        var nmEstabelecimentoAutorizacao: String? = null,
        var nomePortador: String? = null,
        var nuNsu: Int? = null,
        var tpModoEntrada: String? = null,
        var tpTransacao: String? = null,
        var vlAutorizacao: BigDecimal? = null,
        var vlBruto: BigDecimal? = null
) {
    constructor(autorizacaoEntity: AutorizacaoEntity) : this() {

        idAutorizacao = autorizacaoEntity.autorizacaoKey?.idAutorizacao
        cartao = autorizacaoEntity.cartao
        cdAutorizacao = autorizacaoEntity.cdAutorizacao
        cdBanco = autorizacaoEntity.cdBanco
        cdBin = autorizacaoEntity.cdBin
        cdBinAdquirente = autorizacaoEntity.cdBinAdquirente
        cdProduto = autorizacaoEntity.cdProduto
        cdRetorno = autorizacaoEntity.cdRetorno
        cnpjEstabelecimento = autorizacaoEntity.cnpjEstabelecimento
        cpfPortador = autorizacaoEntity.cpfPortador
        dataHora = autorizacaoEntity.dataHora
        dcBinAdquirente = autorizacaoEntity.dcBinAdquirente
        dcModoEntrada = autorizacaoEntity.dcModoEntrada
        dcProduto = autorizacaoEntity.dcProduto
        dcRetorno = autorizacaoEntity.dcRetorno
        dcTecnologia = autorizacaoEntity.dcTecnologia
        dcTerminal = autorizacaoEntity.dcTerminal
        dcTipoTransacao = autorizacaoEntity.dcTipoTransacao
        dcTransNeg = autorizacaoEntity.dcTransNeg
        dcStatus = autorizacaoEntity.dcStatus
        dtAutorizacao = autorizacaoEntity.dtAutorizacao
        dtTransacao = autorizacaoEntity.dtTransacao
        idCartao = autorizacaoEntity.idCartao
        idCompra = autorizacaoEntity.idCompra
        idEstabelecimento = autorizacaoEntity.idEstabelecimento
        idPortador = autorizacaoEntity.idPortador
        nmEstabelecimento = autorizacaoEntity.nmEstabelecimento
        nmEstabelecimentoAutorizacao = autorizacaoEntity.nmEstabelecimentoAutorizacao
        nomePortador = autorizacaoEntity.nomePortador
        nuNsu = autorizacaoEntity.nuNsu
        tpModoEntrada = autorizacaoEntity.tpModoEntrada
        tpTransacao = autorizacaoEntity.tpTransacao
        vlAutorizacao = autorizacaoEntity.vlAutorizacao
        vlBruto = autorizacaoEntity.vlBruto
    }
}
