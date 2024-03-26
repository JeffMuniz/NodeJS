package br.com.mac.reports.entity;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

public class ApiErro {

    private @Valid String mensagem;
    private @Valid List<Erro> erros = new ArrayList<Erro>();


    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public List<Erro> getErros() {
        return erros;
    }

    public void setErros(List<Erro> erros) {
        this.erros = erros;
    }
}
