package br.com.machina.estautoecapi.bean.motor.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@AllArgsConstructor
public enum Politica implements Serializable {

    SANTANDER_SERASA("SANTANDER_SERASA");

    @Getter
    private String value;
}
