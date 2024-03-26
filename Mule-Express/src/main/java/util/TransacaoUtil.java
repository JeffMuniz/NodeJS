package util;

import org.json.JSONException;
import org.json.JSONObject;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;

public class TransacaoUtil implements Callable {

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		
		try {
			
		     JSONObject jsonObject = new JSONObject(eventContext.getMessage().getPayloadAsString("UTF-8"));
		     
		     if(jsonObject.has("transacao")) {
		    	 
		    	 if(jsonObject.getJSONObject("transacao").has("cnpj")) {
		    		 
		    		 //TODO Alterar a variável "encryptedDoc" para receber diretamente o documento encriptado quando estiver PCI Compliant		    		 
		    		 String encryptedDoc = new CryptTransformImpl().encryptCnpjWithNoMask(jsonObject.getJSONObject("transacao").getString("cnpj")); 
		    		 
		    		 String decrypteddDoc = new CryptTransformImpl().decryptCnpjWithMask(encryptedDoc); 		    		 
		    		 
		    		 jsonObject.getJSONObject("transacao").put("cnpj", decrypteddDoc);		    		 
		    		 jsonObject.getJSONObject("transacao").put("cnpjCriptografado", encryptedDoc);
		    		 
		    		 eventContext.getMessage().setPayload(jsonObject);
		    		 
		    	 }
		     }
		     
		}catch (JSONException err){			
			throw new JSONException("Não foi possvel recuperar payload para JSON: "+err.toString());
		}
		
		return eventContext.getMessage().getPayload();
	} 

}
