package br.com.machina.estautoecapi.integration.enums;

import lombok.Getter;

import java.util.Objects;

public enum PathEnum {

    POST("/caminho/"),
    GET("/clientes/%cnpj%");

    @Getter
    private final String path;

    PathEnum(String path) {
        this.path = path;
    }

    public static String getPath(String path) throws Exception {

        if (Objects.isNull(path)) {
            throw new Exception("BillPathEnum");
        }

        for (PathEnum m : values()) {
            if (path.equals(m.name()))
                return m.getPath();
        }

        throw new Exception(path);
    }
}
