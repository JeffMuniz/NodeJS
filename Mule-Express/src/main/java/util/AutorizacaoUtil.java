package util;

import org.json.JSONException;
import org.json.JSONObject;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import br.com.mac.component.crypt.transf.port.CryptTransformUtil;

public class AutorizacaoUtil implements Callable {

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		
		try {
			
		     JSONObject jsonObject = new JSONObject(eventContext.getMessage().getPayloadAsString("UTF-8"));
		     
		     if(jsonObject.has("autorizacoes")) {
		    	 
		    	 CryptTransformUtil cryptTransformUtil = new CryptTransformImpl();
		    	 
		    	 for (int i = 0; i < jsonObject.getJSONArray("autorizacoes").length(); i++) {
		    		 
		    		 JSONObject autorizacaoJsonObject = jsonObject.getJSONArray("autorizacoes").getJSONObject(i);		    		
		    		 
		    		 if(autorizacaoJsonObject.has("cpf") && autorizacaoJsonObject.has("cnpj")) {
			    		 
			    		 //TODO Alterar a variável "encryptedCnpj" e "encryptedCpf" para receber diretamente o documento encriptado quando estiver PCI Compliant	
			    		 
			    		 String encryptedCnpj = cryptTransformUtil.encryptCnpjWithNoMask(autorizacaoJsonObject.getString("cnpj"));
			    		 
			    		 String encryptedCpf = cryptTransformUtil.encryptCpfWithNoMask(autorizacaoJsonObject.getString("cpf"));	
			    		 
			    		 jsonObject.getJSONArray("autorizacoes").getJSONObject(i).put("cnpj", autorizacaoJsonObject.getString("cnpj"));
			    		 jsonObject.getJSONArray("autorizacoes").getJSONObject(i).put("cnpjCriptografado", encryptedCnpj);
			    		 
			    		 jsonObject.getJSONArray("autorizacoes").getJSONObject(i).put("cpf", autorizacaoJsonObject.getString("cpf"));		    		 
			    		 jsonObject.getJSONArray("autorizacoes").getJSONObject(i).put("cpfCriptografado", encryptedCpf);
			    		 
			    	 }
				}
		    	 
		    	eventContext.getMessage().setPayload(jsonObject);
		    	 
		     }
		     
		}catch (JSONException err){			
			throw new JSONException("Não foi possvel recuperar payload para JSON: "+err.toString());
		}
		
		return eventContext.getMessage().getPayload();
	} 

}
