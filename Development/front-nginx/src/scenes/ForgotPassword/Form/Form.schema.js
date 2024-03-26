import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import { errorMessages } from "@enums";

const fields = {
  forgotCpf: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .cpf(errorMessages.InvalidCPF),
  email: FormSchemaValidator.string()
    .email(errorMessages.InvalidMail)
    .required(errorMessages.FieldRequired),
};

export default FormSchemaValidator.object().shape(fields);
