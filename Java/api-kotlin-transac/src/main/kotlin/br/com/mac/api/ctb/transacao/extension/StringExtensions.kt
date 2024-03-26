package br.com.mac.api.ctb.transacao.extension

import br.com.mac.api.ctb.transacao.constant.DATE_ISO8601_PATTERN
import br.com.mac.api.ctb.transacao.constant.DATE_TIME_PATTERN
import br.com.mac.api.ctb.transacao.constant.FIXED_TIME
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

fun String.toDatePattern(): Date = SimpleDateFormat(DATE_TIME_PATTERN).parse(this)
fun String.toDateAndFixedTime(): Date = SimpleDateFormat(DATE_TIME_PATTERN).parse(this.plus(FIXED_TIME))
fun String.convertISO8601ToDate(): Date = SimpleDateFormat(DATE_ISO8601_PATTERN, Locale.getDefault()).parse(this)
