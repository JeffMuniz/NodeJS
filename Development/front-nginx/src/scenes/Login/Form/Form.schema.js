import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import { errorMessages } from "@enums";

const fields = {
  password: FormSchemaValidator.string().required(errorMessages.FieldRequired),
  cpf: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .cpf(errorMessages.InvalidCPF),
};

export default FormSchemaValidator.object().shape(fields);
