package br.com.mac.api.ajuste.financeiro.persistence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tipo")
public class TipoEntity implements Serializable {

    private static final long serialVersionUID = -9197978141354362257L;

    @Id
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "nome")
    private String nome;

    @NotNull
    @Column(name = "descricao")
    private String descricao;

    @NotNull
    @Column(name = "ativo")
    private Boolean ativo;

    @NotNull
    @CreatedDate
    @Column(name = "data_criacao", updatable = false)
    private ZonedDateTime dataCriacao;

    @NotNull
    @LastModifiedDate
    @Column(name = "data_modificacao")
    private ZonedDateTime dataModificacao;

}
