package br.com.mac.reports.entity;

import br.com.mac.reports.enums.RelatorioSolicitacaoStatusEnum;
import br.com.mac.reports.util.postgres.StringJsonUserType;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Table(name = "relatorio_solicitacao")
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TypeDefs({@TypeDef(name = "StringJsonObject", typeClass = StringJsonUserType.class)})
public class RelatorioSolicitacao extends PanacheEntityBase {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "CHAVE_PESQUISA", updatable = false, nullable = false)
    private UUID chavePesquisa;

    @Column(name = "USUARIO")
    private String usuario;

    @Column(name = "EMAIL")
    private String email;

    @OneToOne(targetEntity = Relatorio.class)
    @JoinColumn(name = "ID_RELATORIO", referencedColumnName = "id")
    private Relatorio idRelatorio;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    private RelatorioSolicitacaoStatusEnum status;

    @Column(name = "DADOS_SOLICITACAO")
    @Type(type = "StringJsonObject")
    private String dadosSolicitacao;

    @Column(name = "ID_CHAVE_S3")
    private String idChaveS3;

    @Column(name = "DATA_SOLICITACAO")
    private LocalDateTime dataSolicitacao;

    @Column(name = "CHAVE_EXTERNA")
    private String chaveExterna;

    @Column
    private Long tempoGeracaoRel;

    public static RelatorioSolicitacao findByChavePesquisa(UUID chavePesquisa) {
        return find("chave_pesquisa", chavePesquisa).firstResult();
    }

    public static RelatorioSolicitacao findByChaveExterna(String chaveExterna, UUID idRelatorio) {
        Map<String, Object> params = new HashMap<>();
        params.put("chave_externa", chaveExterna);
        params.put("id_relatorio", idRelatorio);
        return find("chave_externa = :chave_externa and id_relatorio = :id_relatorio", params).firstResult();
    }

}
