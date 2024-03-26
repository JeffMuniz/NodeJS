package br.com.mac.api.ajuste.financeiro.web.api.component;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import lombok.NoArgsConstructor;
import lombok.NonNull;

@Component
@NoArgsConstructor
public class PageRequestComponent {

    private static final String FIELD_ORDER_DEFAULT = "id";
    private static final String TYPE_ORDER_DEFAULT = "DESC";
	
    public PageRequest pagination(final Integer pagina,
                                  final Integer tamanho,
                                  final String campoOrdenacao,
                                  final String tipoOrdenacao) {
        return PageRequest.of(pagina != null ? pagina - 1 : 0,
                tamanho != null ? tamanho : 30,
                campoOrdenacao != null && tipoOrdenacao != null
                        ? Sort.by(setOrders(campoOrdenacao, tipoOrdenacao))
                        : tipoOrdenacao == null && campoOrdenacao != null
                        ? Sort.by(setOrders(campoOrdenacao, TYPE_ORDER_DEFAULT))
                        : tipoOrdenacao != null
                        ? Sort.by(setOrders(FIELD_ORDER_DEFAULT, tipoOrdenacao))
                        : Sort.by(Sort.Direction.DESC, FIELD_ORDER_DEFAULT));
    }
    
	private List<Sort.Order> setOrders(@NonNull final String campoOrdernacao,
			@NonNull final String tipoOrdenacao) {

		final var orders = new ArrayList<Sort.Order>();
		final var camposOrdernacao = campoOrdernacao.split(",");
		
		for (String campo : camposOrdernacao) {
			if (tipoOrdenacao.equals(TYPE_ORDER_DEFAULT)) {
				orders.add(Sort.Order.desc(campo));
			} else {
				orders.add(Sort.Order.asc(campo));
			}
			orders.add(Sort.Order.by(campo));
		}
		return orders;
	}
}
