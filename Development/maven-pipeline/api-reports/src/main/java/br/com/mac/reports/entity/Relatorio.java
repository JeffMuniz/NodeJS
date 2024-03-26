package br.com.mac.reports.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Table(name = "relatorio")
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Relatorio extends PanacheEntityBase {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "ID", updatable = false, nullable = false)
    public UUID id;

    @Column(name = "NOME_RELATORIO")
    public String nomeRelatorio;

    @Column(name = "ID_JASPER")
    public String idJasper;

    @Column(name = "VERSAO")
    public String versao;

    @Column(name = "CALLBACK")
    public String tipoCallback;

    @Column(name = "DIAS_EXPURGO")
    public int diasExpurgo;

    @Column(name = "FORMATO_ARQUIVO")
    public String formatoArquivo;

    @Column(name = "TIPO_DADOS")
    public String tipoDados;

    @Column(name = "DESCRICAO")
    public String descricao;

    public Relatorio findById(UUID id) {
        return find("id", id).firstResult();
    }

}
