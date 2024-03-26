package br.com.mac.api.ajuste.financeiro.util;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.springframework.data.jpa.domain.Specification;

import lombok.NonNull;

public class GenerationDynamicQuery {

	public static <T> Specification<T> run(@NonNull final Object queryParam, @NonNull final DynamicQuery dynamicQuery) {
		
		Specification<T> query = Specification.where(null);
		
		for (Field field : queryParam.getClass().getDeclaredFields()) {
			try {
				
				final var queryParamValue = invokeGetter(queryParam, field.getName());
				
				for (Enum value : dynamicQuery.values()) {
					if (field.getName().equalsIgnoreCase(value.name()) && queryParamValue != null) {
						query = query.and(dynamicQuery.clause(value, queryParamValue));
						break;
					}
				}
			} catch ( IllegalArgumentException | IllegalAccessException | SecurityException  | InvocationTargetException | IntrospectionException e) {
			}
		}

		return query;
	}
	
	private static Object invokeGetter(Object obj, String fieldName) throws IntrospectionException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
			PropertyDescriptor pd = new PropertyDescriptor(fieldName, obj.getClass());
			Method getter = pd.getReadMethod();
			Object f = getter.invoke(obj);
			return f;
	}
}
