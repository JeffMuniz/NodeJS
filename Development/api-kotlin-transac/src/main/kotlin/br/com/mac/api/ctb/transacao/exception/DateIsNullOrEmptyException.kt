package br.com.mac.api.ctb.transacao.exception

class DateIsNullOrEmptyException : RuntimeException {

    constructor() : super() {
        //empty constructor
    }

    constructor(message: String?) : super(message) {
        //only message constructor
    }

    companion object {
        private const val serialVersionUID: Long = -1754918565L
    }
}
