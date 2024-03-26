package br.com.mac.api.ajuste.financeiro.persistence;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.*;
import org.hibernate.annotations.TypeDef;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ajuste_financeiro")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class AjusteFinanceiroEntity implements Serializable {

    private static final long serialVersionUID = -3109065863186626352L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TipoEntity tipo;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private ClienteEntity cliente;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private StatusEntity status;

    @Column(name = "login_usuario")
    private String loginUsuario;

    @Column(name = "nome_usuario")
    private String nomeUsuario;

    @Column(name = "id_solicitacao")
    private Integer idSolicitacao;

    @Column(name = "operacao")
    private Integer operacao;

    @Column(name = "codigo_externo")
    private Integer codExterno;

    @ManyToOne
    @JoinColumn(name = "id_motivo")
    private MotivoEntity motivo;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "valor")
    private BigDecimal valor;

    @Column(name = "data_vencimento")
    private ZonedDateTime dataVencimento;

    @Column(name = "data_finalizacao")
    private ZonedDateTime dataFinalizacao;

    @CreatedDate
    @Column(name = "data_criacao", updatable = false)
    private ZonedDateTime dataCriacao;

    @LastModifiedDate
    @Column(name = "data_modificacao")
    private ZonedDateTime dataModificacao;

    @PrePersist
    protected void prePersist() {
        dataCriacao = dataCriacao != null ? dataCriacao : ZonedDateTime.now();
        dataModificacao = dataModificacao != null ? dataModificacao : ZonedDateTime.now();
    }

    @PreUpdate
    protected void preUpdate() {
        dataModificacao = ZonedDateTime.now();
    }

    public AjusteFinanceiroEntity atualizarAjusteFinanceiro(StatusEntity statusEntity, ZonedDateTime dataFinalizacao) {
        this.setStatus(statusEntity);
        this.setDataFinalizacao(dataFinalizacao);
        return this;
    }
}
