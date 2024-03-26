import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import { errorMessages } from "@enums";

const fields = {
  cpf: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .cpf(errorMessages.InvalidCPF),
  name: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .specialCharacteres(errorMessages.InvalidCharacteres),
  email: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .email(errorMessages.InvalidMail),
  phone: FormSchemaValidator.string()
    .nullable()
    .phone(errorMessages.InvalidPhone),
  birthDate: FormSchemaValidator.string()
    .nullable()
    .birthDate(errorMessages.InvalidDate),
};

export default FormSchemaValidator.object().shape(fields);
