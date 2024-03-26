package br.com.mac.api.ctb.transacao.mock

import br.com.mac.adapter.elassandra.ElassandraAdapter
import br.com.mac.api.ctb.transacao.constant.DATE_PATTERN
import br.com.mac.api.ctb.transacao.constant.DATE_TIME_PATTERN
import br.com.mac.api.ctb.transacao.domain.model.*
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.ctb.entity.*
import br.com.mac.ctb.enum.PontoDeControle
import br.com.mac.ctb.enum.TipoLedger
import com.datastax.driver.core.LocalDate
import com.datastax.driver.core.utils.UUIDs
import com.google.common.reflect.TypeToken
import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Component
import java.io.File
import java.math.BigDecimal
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Collections
import java.util.Date
import java.util.UUID

@Component
class MockTest @Autowired constructor(
    val elassandraAdapter: ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>,
    val elassandraPedidoAdapter: ElassandraAdapter<PedidoEntity, PedidoKey>,
    val elassandraAgendamentoPedidoAdapter: ElassandraAdapter<AgendamentoPedidoEntity, AgendamentoPedidoKey>,
    val elassandraAutorizacaoAdapter: ElassandraAdapter<AutorizacaoEntity, AutorizacaoKey>,
    val elassandraAjusteAdapter: ElassandraAdapter<AjusteEntity, AjusteKey>,
    val elassandraContaVirtualAdapter: ElassandraAdapter<ContaVirtualEntity, ContaVirtualKey>
) {

    @Value("\${ledger.name}")
    private lateinit var ledger: String

    @Value("\${mac.ledger.conciliacao.config.file}")
    private lateinit var conciliacaoFieldsFile: String

    @Value("\${mac.timezone}")
    private var timezone: String? = null

    fun cleanLedger() {

        elassandraAdapter.execute("TRUNCATE test.transacao_contabil;")
    }

    fun cleanOrderTable() {

        elassandraPedidoAdapter.execute("TRUNCATE test.info_pedido_conciliacao;")
    }

    fun cleanAuthorizationTable() {

        elassandraAutorizacaoAdapter.execute("TRUNCATE test.info_autorizacao_conciliacao;")
    }

    fun cleanSchedulingRequestTable() {

        elassandraAjusteAdapter.execute("TRUNCATE test.info_agendamento_pedido;")
    }

    fun cleanAdjustmentTable() {

        elassandraAjusteAdapter.execute("TRUNCATE test.info_ajuste_conciliacao;")
    }

    fun insertBalanceOnLedger(balance: BigDecimal) {

        val insertQuery = "INSERT INTO test.transacao_contabil (cd_transacao,cd_evento,tp_evento," +
                "cd_transacao_anterior,dt_evento, dt_inclusao,tx_valor,tx_saldo,tx_saldo_anterior," +
                "tp_operacao,ds_ledger)" +
                "VALUES (now(),1225,'REPASSE_CONFIRMADO',NULL,'2019-12-31 21:00:00.000','2020-01-27 17:50:15.000'," +
                "1000.00,:balance,0.00,'CREDITO',:ledger);"

        val parameters = hashMapOf(
            Pair("balance", balance),
            Pair("ledger", ledger.toUpperCase())
        )

        elassandraAdapter.execute(insertQuery, parameters as Map<String, Any>?)
    }

    fun insertBalanceAndYesterdayDateOnLedger(balance: BigDecimal) {

        val insertQuery = "INSERT INTO test.transacao_contabil (cd_transacao,cd_evento,tp_evento," +
                "cd_transacao_anterior,dt_evento, dt_inclusao,tx_valor,tx_saldo,tx_saldo_anterior," +
                "tp_operacao,ds_ledger)" +
                "VALUES (now(),1225,'REPASSE_CONFIRMADO',NULL,'2019-12-31 21:00:00.000',:currentDate," +
                "1000.00,:balance,1000.00,'CREDITO',:ledger);"

        val parameters = hashMapOf(
            Pair("currentDate", convertYesterdayDateLocalDateTimeToDate()),
            Pair("balance", balance),
            Pair("ledger", ledger.toUpperCase())
        )

        elassandraAdapter.execute(insertQuery, parameters as Map<String, Any>?)

    }

    fun insertAmountAndTypeAndCurrentDateOnLedger(amount: BigDecimal, type: String) {

        val insertQuery = "INSERT INTO test.transacao_contabil (cd_transacao,cd_evento,tp_evento," +
                "cd_transacao_anterior,dt_evento, dt_inclusao,tx_valor,tx_saldo,tx_saldo_anterior," +
                "tp_operacao,ds_ledger)" +
                "VALUES (now(),1225,'REPASSE_CONFIRMADO',NULL,'2019-12-31 21:00:00.000',:currentDate" +
                ",:amount,1000.00,1000.00,:type,:ledger);"

        val parameters = hashMapOf(
            Pair("currentDate", convertCurrentLocalDateTimeToDate()),
            Pair("amount", amount),
            Pair("type", type),
            Pair("ledger", ledger.toUpperCase())
        )

        elassandraAdapter.execute(insertQuery, parameters as Map<String, Any>?)

    }

    fun insertListOnLedger(): List<TransacaoContabil> {

        val ledgerList = ArrayList<TransacaoContabilEntity>()

        ledgerList.add(
            TransacaoContabilEntity(
                transacaoContabilKey = TransacaoContabilKey(
                    ledger = ledger.toUpperCase(),
                    dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(60L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                    codigoTransacao = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674")
                ),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = null,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00")
            )
        )

        ledgerList.add(
            TransacaoContabilEntity(
                transacaoContabilKey = TransacaoContabilKey(
                    ledger = ledger.toUpperCase(),
                    dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(40L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                    codigoTransacao = UUID.fromString("bf3a52c0-69df-11ea-81ed-bb84fe44d675")
                ),
                codigoTransacaoAnterior = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674"),
                codigoEvento = 2,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.DEBITO.name,
                dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal("1000.00"),
                saldo = BigDecimal.ZERO,
                valor = BigDecimal("1000.00")
            )
        )

        ledgerList.add(
            TransacaoContabilEntity(
                transacaoContabilKey = TransacaoContabilKey(
                    ledger = ledger.toUpperCase(),
                    dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(20L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                    codigoTransacao = UUID.fromString("cf3a52c0-69df-11ea-81ed-bb84fe44d676")
                ),
                codigoTransacaoAnterior = UUID.fromString("bf3a52c0-69df-11ea-81ed-bb84fe44d675"),
                codigoEvento = 3,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00")
            )
        )

        val listEntity = elassandraAdapter.saveAll(ledgerList)

        return listEntity?.map { TransacaoContabil(it) } ?: Collections.EMPTY_LIST as List<TransacaoContabil>
    }

    fun insertAuthorizationOnLedger(): TransacaoContabil {

        val transacaoContabilEntity = TransacaoContabilEntity(
            transacaoContabilKey = TransacaoContabilKey(
                ledger = "TRANSACAO_DESFEITA",
                dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(10L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacao = UUID.fromString("cf3a52c0-69df-11ea-81ed-bb84fe44d676")
            ),
            codigoTransacaoAnterior = UUID.fromString("bf3a52c0-69df-11ea-81ed-bb84fe44d675"),
            codigoEvento = 4,
            tipoEvento = "REPASSE_CONFIRMADO",
            tipoOperacao = TipoOperacao.CREDITO.name,
            dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
            saldoAnterior = BigDecimal.ZERO,
            saldo = BigDecimal("1000.00"),
            valor = BigDecimal("1000.00")
        )

        val entity = elassandraAdapter.insert(transacaoContabilEntity)

        return TransacaoContabil(entity)
    }

    fun insertCreditAdjustmentOnLedger(): TransacaoContabil {

        val transacaoContabilEntity = TransacaoContabilEntity(
            transacaoContabilKey = TransacaoContabilKey(
                ledger = "AJUSTE_CREDITO",
                dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(10L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacao = UUID.fromString("cf3a52c0-69df-11ea-81ed-bb84fe44d676")
            ),
            codigoTransacaoAnterior = UUID.fromString("bf3a52c0-69df-11ea-81ed-bb84fe44d675"),
            codigoEvento = 5,
            tipoEvento = "REPASSE_CONFIRMADO",
            tipoOperacao = TipoOperacao.CREDITO.name,
            dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
            saldoAnterior = BigDecimal.ZERO,
            saldo = BigDecimal("1000.00"),
            valor = BigDecimal("1000.00")
        )

        val entity = elassandraAdapter.insert(transacaoContabilEntity)

        return TransacaoContabil(entity)
    }

    fun insertDebitAdjustmentOnLedger(): TransacaoContabil {

        val transacaoContabilEntity = TransacaoContabilEntity(
            transacaoContabilKey = TransacaoContabilKey(
                ledger = "AJUSTE_DEBITO",
                dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(10L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacao = UUID.fromString("cf3a52c0-69df-11ea-81ed-bb84fe44d676")
            ),
            codigoTransacaoAnterior = UUID.fromString("bf3a52c0-69df-11ea-81ed-bb84fe44d675"),
            codigoEvento = 6,
            tipoEvento = "REPASSE_CONFIRMADO",
            tipoOperacao = TipoOperacao.CREDITO.name,
            dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
            saldoAnterior = BigDecimal.ZERO,
            saldo = BigDecimal("1000.00"),
            valor = BigDecimal("1000.00")
        )

        val entity = elassandraAdapter.insert(transacaoContabilEntity)

        return TransacaoContabil(entity)
    }

    fun createTransacaoContabil(
        ledger: String, tipoOperacao: String = TipoOperacao.CREDITO.name,
        saldoAnterior: BigDecimal = BigDecimal.ZERO, saldo: BigDecimal = BigDecimal.ZERO,
        valor: BigDecimal = BigDecimal("1000.00"),
        totalCreditoDia: BigDecimal = BigDecimal("1000.00"),
        totalCreditoMes: BigDecimal = BigDecimal("1000.00"),
        totalCreditoAno: BigDecimal = BigDecimal("1000.00"),
        date: LocalDateTime? = null
    ) {

        val entity = TransacaoContabilEntity(
            transacaoContabilKey = TransacaoContabilKey(
                ledger = ledger,
                dataInclusao = date ?: converCurrentLocalDateTimeWithSecondsLessToDate(20L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacao = UUID.fromString("cf3a52c0-69df-11ea-81ed-bb84fe44d674")
            ),
            codigoTransacaoAnterior = null,
            codigoEvento = 3,
            tipoEvento = "REPASSE_CONFIRMADO",
            tipoOperacao = tipoOperacao,
            dataEvento = date ?: LocalDateTime.now(),
            saldoAnterior = saldoAnterior,
            saldo = saldo,
            valor = valor,
            totalCreditoDia = totalCreditoDia,
            totalCreditoMes = totalCreditoMes,
            totalCreditoAno = totalCreditoAno
        )

        elassandraAdapter.insert(entity)

    }

    fun insertListOnOrderTable(): List<Pedido> {

        val orderList = ArrayList<PedidoEntity>()

        orderList.add(
            PedidoEntity(
                pedidoKey = PedidoKey(id = BigDecimal("1")),
                cdCargaControleFinanceiro = 2285,
                cdClienteRhCarga = 5227,
                cdClienteRhSolic = 5227,
                cdEmpresa = 5227,
                cdGrupo = 7513,
                cdProduto = 1,
                cdStatusNf = 2,
                cdSubGrupo = 7514,
                cnpjCarga = "87358283000126",
                cnpjRhGrupo = "87358283000126",
                cnpjRhSubgrupo = "87358283000126",
                cnpjSolicitante = "87358283000126",
                cpf = "48679104817",
                dataHora = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                descClienteCarga = "Conductor QA 1",
                descClienteSolicitante = "Conductor QA 1",
                descProduto = "Produto PAT - Alimentação",
                descStatusNf = "NF Gerada - Aguardando Retorno",
                dtAgendamentoCredito = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                dtBaixaPagto = null,
                dtCancelamento = null,
                dtEmissaoTitulo = converCurrentLocalDateTimeWithSecondsLessToDate(777600L),
                dtEntradaPedido = converCurrentLocalDateTimeWithSecondsLessToDate(864000L),
                dtLiberacaoCredito = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dtPagtoPedido = null,
                dtVenctoCobranca = LocalDate.fromYearMonthDay(2019, 6, 22),
                idArquivo = 1587,
                idBoletoPedido = 690,
                idCarga = 14984,
                idPortador = 17681,
                nmGrupo = "Conductor QA",
                nmSubGrupo = "Conductor QA",
                nomePortador = "Eduardo Souza",
                numeroNf = null,
                statusCarga = "Pedido Processado",
                tipoBoleto = "Boleto RH",
                tipoPagto = "POS",
                tipoRecebimento = "B",
                vlCargaPortador = BigDecimal("25.00"),
                vlTotalEsperadoGrupo = BigDecimal("100.00"),
                vlTotalProcessadoGrupo = BigDecimal("100.00")
            )
        )

        orderList.add(
            PedidoEntity(
                pedidoKey = PedidoKey(id = BigDecimal("2")),
                cdCargaControleFinanceiro = 2285,
                cdClienteRhCarga = 5227,
                cdClienteRhSolic = 5227,
                cdEmpresa = 5227,
                cdGrupo = 7513,
                cdProduto = 1,
                cdStatusNf = 2,
                cdSubGrupo = 7514,
                cnpjCarga = "87358283000126",
                cnpjRhGrupo = "87358283000126",
                cnpjRhSubgrupo = "87358283000126",
                cnpjSolicitante = "87358283000126",
                cpf = "48679104817",
                dataHora = converCurrentLocalDateTimeWithSecondsLessToDate(120L),
                descClienteCarga = "Conductor QA 1",
                descClienteSolicitante = "Conductor QA 1",
                descProduto = "Produto PAT - Alimentação",
                descStatusNf = "NF Gerada - Aguardando Retorno",
                dtAgendamentoCredito = converCurrentLocalDateTimeWithSecondsLessToDate(120L),
                dtBaixaPagto = null,
                dtCancelamento = null,
                dtEmissaoTitulo = converCurrentLocalDateTimeWithSecondsLessToDate(777600L),
                dtEntradaPedido = converCurrentLocalDateTimeWithSecondsLessToDate(864000L),
                dtLiberacaoCredito = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dtPagtoPedido = null,
                dtVenctoCobranca = LocalDate.fromYearMonthDay(2019, 6, 22),
                idArquivo = 1587,
                idBoletoPedido = 690,
                idCarga = 14984,
                idPortador = 17681,
                nmGrupo = "Conductor QA",
                nmSubGrupo = "Conductor QA",
                nomePortador = "Eduardo Souza",
                numeroNf = null,
                statusCarga = "Pedido Processado",
                tipoBoleto = "Boleto RH",
                tipoPagto = "POS",
                tipoRecebimento = "B",
                vlCargaPortador = BigDecimal("50.00"),
                vlTotalEsperadoGrupo = BigDecimal("200.00"),
                vlTotalProcessadoGrupo = BigDecimal("200.00")
            )
        )

        orderList.add(
            PedidoEntity(
                pedidoKey = PedidoKey(id = BigDecimal("3")),
                cdCargaControleFinanceiro = 2285,
                cdClienteRhCarga = 5227,
                cdClienteRhSolic = 5227,
                cdEmpresa = 5227,
                cdGrupo = 7513,
                cdProduto = 1,
                cdStatusNf = 2,
                cdSubGrupo = 7514,
                cnpjCarga = "87358283000126",
                cnpjRhGrupo = "87358283000126",
                cnpjRhSubgrupo = "87358283000126",
                cnpjSolicitante = "87358283000126",
                cpf = "48679104817",
                dataHora = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                descClienteCarga = "Conductor QA 1",
                descClienteSolicitante = "Conductor QA 1",
                descProduto = "Produto PAT - Alimentação",
                descStatusNf = "NF Gerada - Aguardando Retorno",
                dtAgendamentoCredito = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                dtBaixaPagto = null,
                dtCancelamento = null,
                dtEmissaoTitulo = converCurrentLocalDateTimeWithSecondsLessToDate(777600L),
                dtEntradaPedido = converCurrentLocalDateTimeWithSecondsLessToDate(864000L),
                dtLiberacaoCredito = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dtPagtoPedido = null,
                dtVenctoCobranca = LocalDate.fromYearMonthDay(2019, 6, 22),
                idArquivo = 1587,
                idBoletoPedido = 690,
                idCarga = 14984,
                idPortador = 17681,
                nmGrupo = "Conductor QA",
                nmSubGrupo = "Conductor QA",
                nomePortador = "Eduardo Souza",
                numeroNf = null,
                statusCarga = "Pedido Processado",
                tipoBoleto = "Boleto RH",
                tipoPagto = "POS",
                tipoRecebimento = "B",
                vlCargaPortador = BigDecimal("100.00"),
                vlTotalEsperadoGrupo = BigDecimal("300.00"),
                vlTotalProcessadoGrupo = BigDecimal("300.00")
            )
        )

        val listEntity = elassandraPedidoAdapter.saveAll(orderList)

        return listEntity?.map { Pedido(it) } ?: Collections.EMPTY_LIST as List<Pedido>
    }

    fun insertOnAuthorizationTable(): Autorizacao {

        val autorizacao = AutorizacaoEntity(
            autorizacaoKey = AutorizacaoKey(idAutorizacao = 4),
            cartao = "4348000020491651",
            cdAutorizacao = "174333",
            cdBanco = 341,
            cdBin = 434892,
            cdBinAdquirente = "473663",
            cdProduto = 1,
            cdRetorno = "00",
            cnpjEstabelecimento = "00000000000000101817",
            cpfPortador = "99999860800",
            dataHora = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
            dcBinAdquirente = "Cielo",
            dcModoEntrada = "CHIP",
            dcProduto = "Produto PAT - Refeição",
            dcRetorno = "Transacao Aprovada",
            dcTecnologia = null,
            dcTerminal = "VISANET",
            dcTipoTransacao = "A100 - Ajuste a credito saldo financiado",
            dcTransNeg = "",
            dcStatus = "APROVADA",
            dtAutorizacao = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
            dtTransacao = converCurrentLocalDateTimeWithSecondsLessToDate(85400L),
            idCartao = 2049,
            idCompra = 33012,
            idEstabelecimento = "000001097488290",
            idPortador = 1391,
            nmEstabelecimento = "Estabelecimento 101817",
            nmEstabelecimentoAutorizacao = "DATERRA ALIMENTOS        BARUERI      BR', 'ORTULEIDE LEOPOLDINO",
            nuNsu = 996012,
            tpModoEntrada = "05",
            tpTransacao = "0100",
            vlAutorizacao = BigDecimal("21.5"),
            vlBruto = BigDecimal("21.5")
        )

        val autorizacaoEntity = elassandraAutorizacaoAdapter.insert(autorizacao)

        return Autorizacao(autorizacaoEntity)
    }

    fun insertCreditOnAdjustmentTable(): Ajuste {

        val ajuste = AjusteEntity(
            ajusteKey = AjusteKey(idAjuste = 5),
            cdAjuste = 633,
            cdEstabelecimentoComercial = 2453,
            cdPortador = 15496,
            cdProduto = 1,
            cdTransacao = 26268,
            cpf = "60771407599",
            dataHora = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
            dcAdquirente = "GetNet",
            dcEstabelecimentoComercial = "Estabelecimento Ambiente QA",
            dcMotivoAjuste = "Charge Back Compra a Vista Visa - Pré-pago",
            dcPortador = "Sanford Thiel",
            dtGeracaoAjuste = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
            dtTransacao = converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
            nmSetupContabil = 21,
            vlDebitoAjuste = null,
            vlCreditoAjuste = BigDecimal("3.01"),
            vlTransacao = BigDecimal("1000.00")

        )

        val ajusteEntity = elassandraAjusteAdapter.insert(ajuste)

        return Ajuste(ajusteEntity)
    }

    fun insertDebitOnAdjustmentTable(): Ajuste {

        val ajuste = AjusteEntity(
            ajusteKey = AjusteKey(idAjuste = 6),
            cdAjuste = 633,
            cdEstabelecimentoComercial = 2453,
            cdPortador = 15496,
            cdProduto = 1,
            cdTransacao = 26268,
            cpf = "60771407599",
            dataHora = converCurrentLocalDateTimeWithSecondsLessToDate(100L),
            dcAdquirente = "GetNet",
            dcEstabelecimentoComercial = "Estabelecimento Ambiente QA",
            dcMotivoAjuste = "Charge Back Compra a Vista Visa - Pré-pago",
            dcPortador = "Sanford Thiel",
            dtGeracaoAjuste = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
            dtTransacao = converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
            nmSetupContabil = 21,
            vlDebitoAjuste = BigDecimal("10.01"),
            vlCreditoAjuste = null,
            vlTransacao = BigDecimal("1000.00")

        )

        val ajusteEntity = elassandraAjusteAdapter.insert(ajuste)

        return Ajuste(ajusteEntity)
    }

    fun getISOCurrentDateAndTime(): String {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN))
    }

    fun getISOCurrentDate(): String {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(DATE_PATTERN))
    }

    fun getISOYesterdayDate(): String {
        return LocalDateTime.now().minusDays(1L).format(DateTimeFormatter.ofPattern(DATE_PATTERN))
    }

    fun getISOYesterdayDateAndTime(): String {
        return LocalDateTime.now().minusDays(1L).format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN))
    }

    fun getISOTomorrowDateAndTime(): String {
        return LocalDateTime.now().plusDays(1L).format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN))
    }

    fun convertCurrentLocalDateTimeToDate(): Date {
        return Date.from(LocalDateTime.now().atZone(ZoneId.of(timezone)).toInstant())
    }

    fun convertYesterdayDateLocalDateTimeToDate(): Date {
        return Date.from(LocalDateTime.now().minusDays(1L).atZone(ZoneId.of(timezone)).toInstant())
    }

    fun converCurrentLocalDateTimeWithSecondsLessToDate(seconds: Long): Date {
        return Date.from(LocalDateTime.now().minusSeconds(seconds).atZone(ZoneId.of(timezone)).toInstant())
    }

    fun convertlistOfTransacaoContabilToResponsePageDto(list: List<Extrato>, page: Pageable): Page<Any> {

        val listDto = list.map(Extrato::toResponseDTO)

        return PageImpl(listDto, page, listDto.count().toLong())
    }

    fun getConciliation(): Conciliacao {

        var conciliacaoMap: Map<String, Conciliacao>

        val conciliacaoFields: List<Conciliacao> = Gson().fromJson(
            File(conciliacaoFieldsFile)
                .readText(Charsets.UTF_8), object : TypeToken<ArrayList<Conciliacao>>() {}.type
        )

        conciliacaoMap = conciliacaoFields.map { it.controle to it }.toMap()

        return conciliacaoMap[PontoDeControle.REPASSE_PEDIDO.name]!!

    }

    fun getControlPoints(): List<PontoControle> {

        val listOfPontoDeControle = mutableListOf<PontoControle>()

        val pontoControle = PontoControle(
            controle = "REPASSE_PEDIDO",
            campoAtuacao = "RH",
            saldoOperacional = BigDecimal("100"),
            saldoSuporte = BigDecimal("100"),
            diferencaOperacional = BigDecimal("100")
        )

        listOfPontoDeControle.add(pontoControle)

        return listOfPontoDeControle

    }

    fun insertCreditSchedulingRequestOnLedger(): TransacaoContabil {

        val transacaoContabilEntity = TransacaoContabilEntity(
                transacaoContabilKey = TransacaoContabilKey(
                        ledger = "PEDIDO_RECEBIMENTO_PENDENTE",
                        dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(10L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                        codigoTransacao = UUID.fromString("cf3a52c0-69df-11ea-81ed-bb84fe44d576")
                ),
                codigoTransacaoAnterior = UUID.fromString("bf3a52c0-69df-11ea-81ed-bb84fe44d575"),
                codigoEvento = 5,
                tipoEvento = "RECEBIMENTO_PENDENTE",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00")
        )

        val entity = elassandraAdapter.insert(transacaoContabilEntity)

        return TransacaoContabil(entity)
    }

    fun insertCreditOnSchedulingRequestTable(): AgendamentoPedido {
        val agendamentoPedido = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(5),
                dataEmissaoTitulo = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                cnpjSolicitante = "111.111.111/1111-11",
                descricaoClienteSolicitante = "Razão Socia",
                cdClienteRhSolic = 2456,
                tipoBoleto = "CAIXA",
                nossoNumero = "0003423.234234",
                tipoRecebimento = "COMERCIAL",
                dataEntradaPedido = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dataLiberacaoPedido = converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                dataVenciementoCobranca = converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                statusCarga = "BEGIN",
                valorCarga = BigDecimal(1000.0),
                valorCredidtoUtilizado = BigDecimal(200.0),
                valorCobranca = BigDecimal(100.0),
                idArquivo = 10,
                codigoCargaControleFinanceiro = 50,
                statusCargamaceficio = 1,
                statusEmpresaCargaDetalheProduto = 3,
                tipoBandeira = "VISA"
        )
        val agendamentoPedidoEntity = elassandraAgendamentoPedidoAdapter.insert(agendamentoPedido)
        return AgendamentoPedido(agendamentoPedidoEntity)
    }

    fun addTransaction(codigoEvento: Int?, tipoLeader: TipoLedger, tipoEvento: String, tipoOperacao: TipoOperacao): TransacaoContabil {

        val transacaoContabilEntity = TransacaoContabilEntity(
                transacaoContabilKey = TransacaoContabilKey(
                        ledger = tipoLeader.name,
                        dataInclusao = converCurrentLocalDateTimeWithSecondsLessToDate(10L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                        codigoTransacao = UUIDs.timeBased()
                ),
                codigoTransacaoAnterior = UUIDs.timeBased(),
                codigoEvento = codigoEvento,
                tipoEvento = tipoEvento,
                tipoOperacao = tipoOperacao.name,
                dataEvento = converCurrentLocalDateTimeWithSecondsLessToDate(120L).toInstant().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00")
        )

        val entity = elassandraAdapter.insert(transacaoContabilEntity)

        return TransacaoContabil(entity)
    }

    fun addOrder(): AgendamentoPedido {
        val agendamentoPedidoCancelado = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(6),
                dataEmissaoTitulo = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                cnpjSolicitante = "111.111.111/1111-11",
                descricaoClienteSolicitante = "Razão Socia",
                cdClienteRhSolic = 2456,
                tipoBoleto = "CAIXA",
                nossoNumero = "0003423.234234",
                tipoRecebimento = "COMERCIAL",
                dataEntradaPedido = converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dataLiberacaoPedido = converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                dataVenciementoCobranca = converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                statusCarga = "BEGIN",
                valorCarga = BigDecimal(1000.0),
                valorCredidtoUtilizado = BigDecimal(200.0),
                valorCobranca = BigDecimal(100.0),
                idArquivo = 10,
                codigoCargaControleFinanceiro = 50,
                statusCargamaceficio = 1,
                statusEmpresaCargaDetalheProduto = 3,
                tipoBandeira = "VISA"
        )
        val agendamentoPedidoEntity = elassandraAgendamentoPedidoAdapter.insert(agendamentoPedidoCancelado)
        return AgendamentoPedido(agendamentoPedidoEntity)
    }

    fun addVirtualAccounting(): ContaVirtual {
        val contaVirtual = ContaVirtualEntity(
                contaVirtualKey = ContaVirtualKey(6),
                tipoOperacao = TipoOperacao.CREDITO.name,
                idTipoRegistro = "Tipo Registro",
                idTipoAjuste = 10,
                idPedido = 20,
                descricaoClienteCarga = "Descricao Cliente Carga",
                cnpjCarga = "111.111.111./0001-68",
                dataHora = LocalDateTime.now()
        )
        val contaVirtualEntity = elassandraContaVirtualAdapter.insert(contaVirtual)
        return ContaVirtual(contaVirtualEntity)
    }
}


