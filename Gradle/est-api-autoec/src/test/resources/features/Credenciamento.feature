#language: pt

@IntegrationTest
@test_credenciamento
Funcionalidade: : Validar Auto credenciamento do EC


  # POST - /clientes/{cnpj}
  @salvar
  Cenario: Salvar registro de credenciamento do EC
    Dado Tenha os dados do estabelecimento para salvar
    Quando Chamar o serviço "POST" para salvar registro
    Entao Recebo o codigo de retorno "200"

#  Cenario: Salvar registro de credenciamento com dados inválidos
#    Dado Que quero testar o "Salvar registro de Credenciamento com dados inválidos"
#    E Os dados do estabelecimento estejam inválidos
#    Quando Chamar o serviço "POST" para salvar registro
#    Entao Recebo o codigo de retorno "400"
#
#
#  # PATH - /clientes/{cnpj}
#  Cenario: Atualizar registro de credenciamento do EC
#    Dado Que quero testar o "Atualizar registro de Credenciamento"
#    E Tenha um estabelelecimento com registro salvo
#    Quando Chamar o serviço "PATH" para alterar registro
#    Entao Recebo o codigo de retorno "200"
#
#  Cenario: Atualizar registro de credenciamento com CNPJ não cadastrado
#    Dado Que quero testar o "Atualizar registro de credenciamento com CNPJ não cadastrado"
#    E Tenha um estabelelecimento sem registro salvo
#    Quando Chamar o serviço "PATH" para alterar registro
#    Entao Recebo o codigo de retorno "404"
#
#  Cenario: Atualizar registro de credenciamento com dados inválidos
#    Dado Que quero testar o "Atualizar registro de credenciamento com dados inválidos"
#    E Tenha um estabelelecimento com registro salvo
#    E Atualize o registro com dados inválidos
#    Quando Chamar o serviço "PATH" para alterar registro
#    Entao Recebo o codigo de retorno "400"