package br.com.machina.estautoecapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.validation.beanvalidation.CustomValidatorBean;

@SpringBootApplication
@ComponentScan("br.com.machina")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public javax.validation.Validator customValidatorBean() {
        return new CustomValidatorBean();
    }

}
