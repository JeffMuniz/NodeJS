package br.com.mac.api.ajuste.financeiro.business;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.mac.api.ajuste.financeiro.api.AjusteCoreAPI;
import br.com.mac.api.ajuste.financeiro.api.AprovacaoAPI;
import br.com.mac.api.ajuste.financeiro.api.request.CriarSolicitacaoRequest;
import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.SolicitacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.exception.BadRequestException;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.exception.PreconditionException;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.persistence.StatusEntity;
import br.com.mac.api.ajuste.financeiro.repository.AjusteFinanceiroRepository;
import br.com.mac.api.ajuste.financeiro.repository.AjusteFinanceiroRepositorySpecification;
import br.com.mac.api.ajuste.financeiro.repository.StatusRepository;
import br.com.mac.api.ajuste.financeiro.repository.filter.AjusteFinanceiroDynamicQuery;
import br.com.mac.api.ajuste.financeiro.util.DateUtil;
import br.com.mac.api.ajuste.financeiro.util.GenerationDynamicQuery;
import br.com.mac.api.ajuste.financeiro.util.ObjectUtil;
import br.com.mac.api.ajuste.financeiro.util.StringUtil;
import br.com.mac.api.ajuste.financeiro.web.api.dto.AjusteFinanceiroQueryParamsDto;
import br.com.mac.api.ajuste.financeiro.web.api.model.AtualizacaoAjusteFinanceiro;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjuste;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import lombok.NonNull;

/**
 * Classe que representa as regras de negocio referente a solicitacao
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Service
public class AjusteFinanceiroBO {

    @Autowired
    private MotivoBO motivoBO;

    @Autowired
    private ClienteBO clienteBO;

    @Autowired
    private TipoOperacaoBO tipoBO;

    @Autowired
    private StatusBO statusBO;

    @Autowired
    private AprovacaoAPI aprovacaoAPI;    
    
    @Autowired
    private AjusteCoreAPI ajusteCoreAPI;

    @Autowired
    private AjusteFinanceiroRepositorySpecification solicitacaoRepoSpec;

    @Autowired
    private AjusteFinanceiroRepository ajusteFinanceiroRepo;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private AjusteFinanceiroDynamicQuery ajusteFinanceiroDynamicQuery;

    public Page<AjusteFinanceiroEntity> buscaAjusteFinanceiroPorFiltro(
            @NonNull final AjusteFinanceiroQueryParamsDto solicitacaoQueryParamsDto,
            @NonNull final PageRequest pageRequest) {

        return solicitacaoRepoSpec.findAll(
                GenerationDynamicQuery.run(solicitacaoQueryParamsDto, ajusteFinanceiroDynamicQuery), pageRequest);
    }

    @Transactional
    public AjusteFinanceiroEntity buscaAjusteFinanceiroPorID(int idSolicitacao) {
        return ajusteFinanceiroRepo
                .findById(idSolicitacao)
                .orElseThrow(() -> new NotFoundException(ExceptionsMessagesEnum.AJUSTE_NAO_ENCONTRADO.getMessage()));
    }

    @Transactional
    public Integer criarAjuste(String authorization, @NonNull CriaAjuste ajuste) {
        this.validaEntradaAjuste(ajuste);
        AjusteFinanceiroEntity ajusteEntity = this.ajusteFinanceiroRepo.save(AjusteFinanceiroEntity.builder()
                .operacao(OperacaoEnum.getEnum(ajuste.getOperacao().name()).getValue())
                .tipo(tipoBO.buscaTipoOperacao(TipoEnum.getEnum(ajuste.getTipo().name()).getValue()))
                .nomeUsuario(ajuste.getUsuario().getNomeUsuario())
                .loginUsuario(ajuste.getUsuario().getLoginUsuario())
                .cliente(this.clienteBO.buscaOuIncluiCliente(TipoEnum.getEnum(ajuste.getTipo().name()),
                        ajuste.getCliente().getNome(),
                        ajuste.getCliente().getCnpj(),
                        ajuste.getCliente().getCpf(),
                        OperacaoEnum.getEnum(ajuste.getOperacao().name()),
                        ajuste.getCliente().getIdConta(),
                        ajuste.getCliente().getDescricaoConta()))
                .codExterno(ajuste.getCodigoExterno())
                .valor(BigDecimal.valueOf(ajuste.getValor()).setScale(2, RoundingMode.HALF_UP))
                .observacao(ajuste.getObservacao())
                .motivo(this.motivoBO.buscaMotivo(ajuste.getIdMotivo()))
                .idSolicitacao(0)
                .dataVencimento(DateUtil.parseStringByZonedDateTime(ajuste.getDataVencimento()))
                .dataCriacao(ZonedDateTime.now())
                .dataFinalizacao(null)
                .dataModificacao(ZonedDateTime.now())
                .status(this.statusBO.buscaStatus(StatusEnum.PENDENTE.getValue())).build());
        ajusteEntity.setIdSolicitacao(this.criarSolicitacaoAprovacao(authorization, ajusteEntity, ajuste.getDocumento()));
        this.ajusteFinanceiroRepo.save(ajusteEntity);

        return ajusteEntity.getId();
    }

    @Transactional
    public AjusteFinanceiroEntity atualizarAjusteFinanceiro(String authorization, int id, AtualizacaoAjusteFinanceiro atualizacaoAjusteFinanceiro) {

        StatusEntity statusEntity = statusRepository.findById(StatusEnum.valueOf(atualizacaoAjusteFinanceiro.getAjuste().getStatus().name()).getValue())
                .orElseGet(() -> {
                    throw new NotFoundException(ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage());
        });

        AjusteFinanceiroEntity ajusteFinanceiroEntity = ajusteFinanceiroRepo
                .findById(id)
                .orElseGet(() -> {
                    throw new NotFoundException(ExceptionsMessagesEnum.AJUSTE_NAO_ENCONTRADO.getMessage());
                });

        Integer statusId = ajusteFinanceiroEntity.getStatus().getId();

        if (Objects.equals(statusId, StatusEnum.APROVADO.getValue()) || Objects.equals(statusId, StatusEnum.RECUSADO.getValue())) {
            throw new BadRequestException(ExceptionsMessagesEnum.STATUS_NAO_PERMITIDO.getMessage());
        }

        this.validaDataVencimentoAjuste(ajusteFinanceiroEntity);

        ajusteFinanceiroEntity.atualizarAjusteFinanceiro(statusEntity, atualizacaoAjusteFinanceiro.getAjuste().getDataFinalizacao());
        
        if(Objects.equals(statusEntity.getId(), StatusEnum.APROVADO.getValue())) {
        	ajusteFinanceiroEntity = this.ajusteCoreAPI.criarAjuste(authorization, ajusteFinanceiroEntity);       
        }
        ajusteFinanceiroEntity = ajusteFinanceiroRepo.save(ajusteFinanceiroEntity);

        return ajusteFinanceiroEntity;
        
        
    }

    private boolean validaDataVencimentoAjuste(AjusteFinanceiroEntity ajusteFinanceiroEntity) {
    	LocalDate dataValida = LocalDate.now().plusDays(2);
    	if(ajusteFinanceiroEntity.getDataVencimento().toLocalDate().isAfter(dataValida) 
    			|| ajusteFinanceiroEntity.getDataVencimento().toLocalDate().isEqual(dataValida)) {
    		return true;
    	}else {
    		 throw new BadRequestException(ExceptionsMessagesEnum.AJUSTE_DATA_MENOR_DOIS_DIAS.getMessage());
    	}
    }

    private Integer criarSolicitacaoAprovacao(String authorization, final AjusteFinanceiroEntity ajuste, 
    		final String documento) {

        TipoEnum tipoEnum = TipoEnum.getEnum(ajuste.getTipo().getId());
        OperacaoEnum operacaoEnum = OperacaoEnum.getEnum(ajuste.getOperacao());
        SolicitacaoEnum solicitacaoEnum = SolicitacaoEnum.getEnum(tipoEnum, operacaoEnum);

        CriarSolicitacaoRequest request = new CriarSolicitacaoRequest(
        		new ArrayList<CriarSolicitacaoRequest.Solicitacao>());
        
        CriarSolicitacaoRequest.Solicitacao solicitacao = CriarSolicitacaoRequest.Solicitacao.builder()
	        .tipo(new CriarSolicitacaoRequest.Id(solicitacaoEnum.getCodigo().intValue()))
	        .usuario(new CriarSolicitacaoRequest.Usuario(ajuste.getLoginUsuario(), ajuste.getNomeUsuario()))
	        .cliente(new CriarSolicitacaoRequest.Cliente(ajuste.getCliente().getNome(),
	                StringUtils.isEmpty(ajuste.getCliente().getCpf()) ? null :
	                	new CryptTransformImpl().decryptAes(ajuste.getCliente().getCpf()),
	                StringUtils.isEmpty(ajuste.getCliente().getCnpj()) ? null :
	                	new CryptTransformImpl().decryptAes(ajuste.getCliente().getCnpj()))
	        		)
	        .operacaoExterno(new CriarSolicitacaoRequest.Id(ajuste.getId()))
	        .detalhe(CriarSolicitacaoRequest.converterHashMapDetalhe(this.criarHashMapDetalhe(ajuste)))
	        .documento(documento)
	        .valor(ajuste.getValor())
	        .build();
        
        request.getSolicitacoes().add(solicitacao);
        
        return aprovacaoAPI.criarSolicitacao(authorization, request).intValue();

    }

    private Boolean validaEntradaAjuste(@NonNull CriaAjuste ajuste){
        if(ObjectUtil.isAnyObjectNull(ajuste.getTipo(),
                ajuste.getOperacao(),
                ajuste.getUsuario(),
                ajuste.getUsuario() != null ? ajuste.getUsuario().getLoginUsuario() : StringUtils.EMPTY,
                ajuste.getUsuario() != null ? ajuste.getUsuario().getNomeUsuario() : StringUtils.EMPTY,
                ajuste.getCliente(),
                ajuste.getDataVencimento(),
                ajuste.getIdMotivo(),
                ajuste.getValor())){
            throw new PreconditionException(ExceptionsMessagesEnum.ENTRADA_INVALIDA.getMessage());
        }
        return Boolean.TRUE;
    }

    private LinkedHashMap<String, String> criarHashMapDetalhe(final AjusteFinanceiroEntity ajuste) {

        TipoEnum tipoEnum = TipoEnum.getEnum(ajuste.getTipo().getId());
        OperacaoEnum operacaoEnum = OperacaoEnum.getEnum(ajuste.getOperacao());

        LinkedHashMap<String, String> detalhe = new LinkedHashMap<String, String>();
        detalhe.put("ID Ajuste", ajuste.getId().toString());
        detalhe.put("Tipo de operação",tipoEnum.name().concat(" | ").concat(operacaoEnum.getDescricao().toUpperCase()));
        detalhe.put("Motivo", ajuste.getMotivo().getId().toString().concat(" - ").concat(ajuste.getMotivo().getDescricao()));
        detalhe.put("Cliente", ajuste.getCliente().getNome());
        
        if(ajuste.getCliente().getCpf() != null) {
            detalhe.put("CPF", new CryptTransformImpl().decryptCpfWithMask(ajuste.getCliente().getCpf()));
            detalhe.put("Conta Portador", ajuste.getCliente().getDescricaoConta());
        }else if(ajuste.getCliente().getCnpj() != null) {
            detalhe.put("CNPJ", new CryptTransformImpl().decryptCnpjWithMask(ajuste.getCliente().getCnpj()));
        }
        if(TipoEnum.EC.getValue().equals(ajuste.getTipo())) {
        	detalhe.put("Código Pagamento", ajuste.getCodExterno() != null
        			? ajuste.getCodExterno().toString() : StringUtils.EMPTY);
        }else if(TipoEnum.RH.getValue().equals(ajuste.getTipo())) {
        	detalhe.put("Código Pedido", ajuste.getCodExterno() != null
        			? ajuste.getCodExterno().toString() : StringUtils.EMPTY);
        }
        detalhe.put("Data de vencimento", DateUtil.parseZonedDateTimeByDateFormatBR(ajuste.getDataVencimento()));
        detalhe.put("Valor", StringUtil.formataValorReal(ajuste.getValor()));
        detalhe.put("Comentário", ajuste.getObservacao() != null
                ? ajuste.getObservacao() : StringUtils.EMPTY);

        return detalhe;

    }

}
