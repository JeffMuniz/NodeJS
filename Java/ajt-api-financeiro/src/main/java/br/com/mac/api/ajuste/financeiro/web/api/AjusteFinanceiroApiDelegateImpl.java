package br.com.mac.api.ajuste.financeiro.web.api;

import br.com.mac.api.ajuste.financeiro.business.AjusteFinanceiroBO;
import br.com.mac.api.ajuste.financeiro.web.api.component.PageRequestComponent;
import br.com.mac.api.ajuste.financeiro.web.api.mapper.AjusteFinanceiroBodyMapper;
import br.com.mac.api.ajuste.financeiro.web.api.mapper.AjusteFinanceiroMapper;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiro;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBody;
import br.com.mac.api.ajuste.financeiro.web.api.model.AtualizacaoAjusteFinanceiro;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjuste;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AjusteFinanceiroApiDelegateImpl implements AjustesApiDelegate {

    @Autowired
    private PageRequestComponent pageRequestComponent;

    @Autowired
    private AjusteFinanceiroBO ajusteFinanceiroBO;

    public ResponseEntity<AjusteFinanceiroBody> atualizarAjusteFinanceiro(String authorization, Integer id, AtualizacaoAjusteFinanceiro atualizacaoAjusteFinanceiro) {
        return ResponseEntity.status(HttpStatus.OK).body(AjusteFinanceiroBodyMapper.serialize(
                this.ajusteFinanceiroBO.atualizarAjusteFinanceiro(authorization, id, atualizacaoAjusteFinanceiro)));
    }

    @Override
    public ResponseEntity<AjusteFinanceiro> buscaAjusteFinanceiro(String authorization, Integer id,
                                                                  Integer idSolicitacao,
                                                                  String tipo,
                                                                  String operacao,
                                                                  String status,
                                                                  String clienteNome,
                                                                  String clienteCpf,
                                                                  String clienteCnpj,
                                                                  String dataCriacaoInicial,
                                                                  String dataCriacaoFinal,
                                                                  String dataFinalizacaoInicial,
                                                                  String dataFinalizacaoFinal,
                                                                  Double valor,
                                                                  Double valorMaiorque,
                                                                  Double valorMenorque,
                                                                  Integer limite,
                                                                  Integer pagina,
                                                                  String tipoOrdenacao,
                                                                  String campoOrdenacao) {
        return ResponseEntity.status(HttpStatus.OK).body(AjusteFinanceiroMapper
                .serialize(this.ajusteFinanceiroBO.buscaAjusteFinanceiroPorFiltro(AjusteFinanceiroMapper.serialize(
                        id,
                        idSolicitacao,
                        tipo,
                        operacao,
                        status,
                        clienteNome,
                        clienteCpf,
                        clienteCnpj,
                        dataCriacaoInicial,
                        dataCriacaoFinal,
                        dataFinalizacaoInicial,
                        dataFinalizacaoFinal,
                        valor,
                        valorMaiorque,
                        valorMenorque),
                        pageRequestComponent.pagination(pagina, limite, campoOrdenacao, tipoOrdenacao))));
    }

    @Override
    public ResponseEntity<AjusteFinanceiroBody> buscaAjusteFinanceiroPorID(String authorization, Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(AjusteFinanceiroBodyMapper.serialize(
                this.ajusteFinanceiroBO.buscaAjusteFinanceiroPorID(id)));
    }

    @Override
    public ResponseEntity<AjusteFinanceiroBody> criarAjuste(String authorization, CriaAjuste ajuste) {
        Integer idAjuste = this.ajusteFinanceiroBO.criarAjuste(authorization, ajuste);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                this.buscaAjusteFinanceiroPorID(authorization, idAjuste).getBody());
    }
}
