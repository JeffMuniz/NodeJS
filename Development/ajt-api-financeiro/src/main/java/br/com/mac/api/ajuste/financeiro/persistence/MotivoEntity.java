package br.com.mac.api.ajuste.financeiro.persistence;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "motivo")
public class MotivoEntity implements Serializable {

    private static final long serialVersionUID = -6222546139587518675L;

    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private TipoEntity tipo;

    @Column(name = "operacao")
    private Integer operacao;

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
