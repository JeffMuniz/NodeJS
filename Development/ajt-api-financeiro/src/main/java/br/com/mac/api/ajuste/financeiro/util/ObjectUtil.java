package br.com.mac.api.ajuste.financeiro.util;

public final class ObjectUtil {

    public static boolean isAnyObjectNull(Object... objects) {
        for (Object o: objects) {
            if (o == null) {
                return true;
            }
        }
        return false;
    }

}
