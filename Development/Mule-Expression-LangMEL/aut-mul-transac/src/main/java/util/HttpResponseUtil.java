package util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import org.apache.log4j.Logger;

public class HttpResponseUtil implements Callable{

	final static Logger logger = Logger.getLogger(HttpResponseUtil.class);
	
	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		
	    @SuppressWarnings("unchecked")
		List<String> payloadList = (List<String>) eventContext.getMessage().getPayload();	
	     
	    String currentFlowName = eventContext.getFlowConstruct().getName();
	     
		try {	
			
		     JSONObject inJsonObject0 = new JSONObject(payloadList.get(0));	
		     JSONObject inJsonObject1 = new JSONObject(payloadList.get(1));			     
		     int httpResponse=0;
		     		     
		     int aprovacaoCode = inJsonObject0.getInt("aprovacaoCode");
		     int contestCancelamentoCode = (currentFlowName.equalsIgnoreCase("post:/contestacoes:application/json:api-config")) ? 
		    		 inJsonObject1.getInt("contestacaoCode") : inJsonObject1.getInt("cancelamentoCode");		     
		     
		     //http rule highest code 
		     httpResponse = (aprovacaoCode >= contestCancelamentoCode) ? aprovacaoCode : contestCancelamentoCode;
		     
		     eventContext.getMessage().setInvocationProperty("httpResponse", httpResponse);
		     
		}catch (JSONException err){			
			
			logger.error("payloadList.get(0): "+payloadList.get(0));
			logger.error("payloadList.get(1): "+payloadList.get(1));
		    
			throw new JSONException("Não foi possvel recuperar payload para JSON: "+err.toString());
		}
		
		return eventContext.getMessage().getPayload();
	} 

}
