# language: pt

Funcionalidade: Listar ajustes financeiros por filtro

  Cenário de Fundo:
  ---------------------------------------------------------------------
  Aqui, seis ajustes são criados para a realização dos testes dos filtros
  ---------------------------------------------------------------------

    Dado os ajustes com os seguintes ajustes
      |               massa                   |
      |    ajusteEcCreditoPendente            | 
      |    ajustePortadorDebitoAprovado       | 
      |    ajusteRHCreditoPendente            | 
      |    ajustePortadorCreditoRecusado      |
      |    ajustePortadorDebitoPendenteUm     |
      |    ajustePortadorDebitoPendenteDois   |         
    Quando o ajuste exista

  Esquema do Cenário: <testCase> <expectedResult>

    Dado os seguintes atributos
      | campo   | valor  |
      | <campo> | <valor> | 
    Quando o usuário realizar a busca'<testCase>' para o ajuste
    Então retornará '<expectedResult>'

    Exemplos:
      | testCase                         | expectedResult |     campo    |    valor    |      
      | COM FILTRO DE ID NAO ENCONTRADO  | VAZIO          |      id      |    99999    |         
      | COM FILTRO DE TIPO EC            | SUCESSO        |     tipo     |      EC     |        
      | COM FILTRO DE TIPO RH            | SUCESSO        |     tipo     |      RH     |  
      | COM FILTRO DE TIPO PORTADOR      | SUCESSO        |     tipo     |   PORTADOR  |  
      | COM FILTRO DE OPERACAO DEB.      | SUCESSO        |   operacao   |    DEBITO   |     
      | COM FILTRO DE OPERACAO CRED.     | SUCESSO        |   operacao   |    CREDITO  |         
      | COM FILTRO DE STATUS             | SUCESSO        |    status    |   PENDENTE  |   
      | COM FILTRO DE STATUS             | SUCESSO        |    status    |   APROVADO  |   
      | COM FILTRO DE STATUS             | SUCESSO        |    status    |   RECUSADO  |   

      