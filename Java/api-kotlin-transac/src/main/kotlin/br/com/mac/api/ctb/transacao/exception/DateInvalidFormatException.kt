package br.com.mac.api.ctb.transacao.exception

class DateInvalidFormatException : RuntimeException {

    constructor() : super() {
        //empty constructor
    }

    constructor(message: String?) : super(message) {
        //only message constructor
    }

    companion object {
        private const val serialVersionUID: Long = -90378356L
    }
}
