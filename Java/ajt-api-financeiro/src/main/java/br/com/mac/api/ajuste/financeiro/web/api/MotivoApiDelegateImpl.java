package br.com.mac.api.ajuste.financeiro.web.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.mac.api.ajuste.financeiro.business.MotivoBO;
import br.com.mac.api.ajuste.financeiro.web.api.mapper.AjusteMotivoMapper;
import br.com.mac.api.ajuste.financeiro.web.api.model.MotivoAjusteBody;


@Service
public class MotivoApiDelegateImpl implements MotivosApiDelegate {
	
	@Autowired
	private MotivoBO motivoBO;
	
	
	
	@Override
	public ResponseEntity<List<MotivoAjusteBody>> buscaMotivosPorOperacaoETipo(Integer idOperacao, Integer idTipo) {
		 return ResponseEntity
					.ok(motivoBO
							.buscaMotivos(AjusteMotivoMapper
											.serialize(idOperacao, idTipo))
							.stream()
							.map(entity -> AjusteMotivoMapper.serialize(entity))
							.collect(Collectors.toList()));
	}
}
