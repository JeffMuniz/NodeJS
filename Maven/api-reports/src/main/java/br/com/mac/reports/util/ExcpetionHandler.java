package br.com.mac.reports.util;

import java.io.Serializable;

public class ExcpetionHandler extends Exception implements Serializable {


    private static final long serialVersionUID = 1L;

    public ExcpetionHandler() {
        super();
    }

    public ExcpetionHandler(String msg) {
        super(msg);
    }

    public ExcpetionHandler(String msg, Exception e) {
        super(msg, e);
    }

}
