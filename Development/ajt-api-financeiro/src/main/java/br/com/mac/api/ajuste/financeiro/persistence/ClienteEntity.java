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
@Table(name = "cliente")
public class ClienteEntity implements Serializable {

    private static final long serialVersionUID = -4198132351202592743L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "id_conta")
    private Integer idConta;

    @Column(name = "descricao_conta")
    private String descricaoConta;

    @CreatedDate
    @Column(name = "data_criacao", updatable = false)
    private ZonedDateTime dataCriacao;

    @LastModifiedDate
    @Column(name = "data_modificacao")
    private ZonedDateTime dataModificacao;

    @PrePersist
    protected void prePersist() {
        dataModificacao = dataCriacao = ZonedDateTime.now();
    }

    @PreUpdate
    protected void preUpdate() {
        dataModificacao = ZonedDateTime.now();
    }

}
