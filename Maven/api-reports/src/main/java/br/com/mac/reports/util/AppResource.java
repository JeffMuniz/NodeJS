package br.com.mac.reports.util;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

import javax.ws.rs.core.Application;

@OpenAPIDefinition(
        info = @Info(
                title = "Reports API",
                version = "1.0.0")
)
public class AppResource extends Application {
}
