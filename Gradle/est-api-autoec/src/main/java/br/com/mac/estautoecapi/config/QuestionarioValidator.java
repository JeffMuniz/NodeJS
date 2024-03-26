package br.com.machina.estautoecapi.config;

import br.com.machina.customexception.exception.BadRequestCustom;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.Questionario;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Errors;
import org.springframework.validation.beanvalidation.CustomValidatorBean;

import static java.util.Objects.isNull;

@Configuration
public class QuestionarioValidator extends CustomValidatorBean {

    @Override
    public boolean supports(@NotNull Class<?> clazz) {
        return Questionario.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, @NotNull Errors errors) {
        if (isNull(target))
            return;

        super.validate(target, errors);
        if(errors.hasErrors())
            throw new BadRequestCustom(errors.getAllErrors().toString());
    }

}