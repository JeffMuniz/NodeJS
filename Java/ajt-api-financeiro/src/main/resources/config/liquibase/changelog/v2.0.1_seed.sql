update motivo m set operacao = (select 
								  case 
								     when operacao = 0  then 0
								     when operacao = 1  then 2 
								     when operacao = 2  then 1
								  end as newops
								from motivo 
								where id = m.id)
