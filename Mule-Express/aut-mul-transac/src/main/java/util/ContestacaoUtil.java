package util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.json.JSONException;
import org.json.JSONObject;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import com.fasterxml.jackson.jr.ob.JSON;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import br.com.mac.component.crypt.transf.port.CryptTransformUtil;

public class ContestacaoUtil implements Callable {

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		
		try {
			
		     JSONObject inJsonObject = new JSONObject(eventContext.getMessage().getPayloadAsString("UTF-8"));		    
		     CryptTransformUtil cryptTransformUtil = new CryptTransformImpl();
		     String currentFlowName = eventContext.getFlowConstruct().getName();		     
		     
		     int solicTipoId = -1;
		     int idTipoResolucao = -1;		    
		     String documentoStr = null;
		     
		     // Date		     
		     DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		     Date date = new Date();
		     String dateTimeStr = dateFormat.format(date);	
		     
		    // Check current Flow
		    if(currentFlowName.equalsIgnoreCase("post:/contestacoes:application/json:api-config")) {
		    	
				solicTipoId = 9;
				idTipoResolucao = 2;	
				
		    }else if(currentFlowName.equalsIgnoreCase("post:/cancelamentos:application/json:api-config")) {
		    	
				solicTipoId = 8;
				idTipoResolucao = 4;	
			}

		    if(inJsonObject.has("documento")) {
		    	documentoStr = inJsonObject.getString("documento");
		    }

		     // Payload Aprovacao		     
		     String aprovacaoJson = JSON.std
		    		  .composeString()
		    		  .startObject()
		    		     .startArrayField("solicitacoes")
  		    		       .startObject()
  		    		         .startObjectField("tipo")
  		    		           .put("id", solicTipoId)
  		    		         .end()
  		    		         .startObjectField("usuario")
  		    		           .put("loginUsuario", inJsonObject.getJSONObject("usuario").getString("loginUsuario"))
  		    		           .put("nomeUsuario", inJsonObject.getJSONObject("usuario").getString("nomeUsuario"))
  		    		         .end()
  		    		         
  		    		         .startObjectField("cliente")
  		    		           .put("nome", inJsonObject.getJSONObject("cliente").getString("nome"))
  		    		           .put("cnpj", cryptTransformUtil.decryptAes(inJsonObject.getJSONObject("cliente").getString("cnpjCriptografado")))
  		    		         .end()
  		    		         
  		    		         .startObjectField("operacaoExterno")
  		    		           .put("id", inJsonObject.getInt("idTransacao"))
  		    		         .end()
  		    		         .put("documento", documentoStr)
  		    		         .put("valor", inJsonObject.getDouble("valor"))
  		    		         .startArrayField("detalhe")
  		    		           .startObject()
  		    		             .put("campo", inJsonObject.getJSONArray("detalhe").getJSONObject(0).getString("campo"))
  		    		             .put("valor", inJsonObject.getJSONArray("detalhe").getJSONObject(0).getString("valor"))
  		    		           .end()
  		    		         .end()
  		    		         
		    		       .end()
		    		     .end()
		    		   .end()
		              .finish();
		     
		     // Payload Contestacao / Cancelamento				     
		     String contestacaoCancelamento = JSON.std
		    		  .composeString()
		    		  .startObject()
		    		    .put("idEventoCompra", inJsonObject.getInt("idTransacao"))
		    		    .put("idConta", 0)
		    		    .put("idOperacao", 234)
		    		    .put("dataContestacao", dateTimeStr)
		    		    .put("parcelaPedida", 1)
		    		    .put("quantidadeParcelas", 1)
		    		    .put("status", 2)
		    		    .put("idStatusContestacao", 1)
		    		    .put("historico", inJsonObject.getString("comentario"))
		    		    .put("dataAlteracao", dateTimeStr)
		    		    .put("responsavel", inJsonObject.getJSONObject("usuario").getString("loginUsuario"))
		    		    .put("idTipoResolucao", idTipoResolucao)
		    		    .put("idArquivo", 0)
			          .end()
		    		  .finish();
		     
		     eventContext.getMessage().setInvocationProperty("aprovacaoPayload", aprovacaoJson);
		     eventContext.getMessage().setInvocationProperty("aprovacaoContLength", aprovacaoJson.getBytes("UTF-8").length);
		     
		     eventContext.getMessage().setInvocationProperty("contestacaoCancelamentoPayload", contestacaoCancelamento);
		     eventContext.getMessage().setInvocationProperty("contCancelamentoLength", contestacaoCancelamento.getBytes("UTF-8").length);
		     
		     
		}catch (JSONException err){			
			throw new JSONException("Não foi possvel recuperar payload para JSON: "+err.toString());
		}
		
		return eventContext.getMessage().getPayload();
	} 

}
