import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import { errorMessages } from "@enums";

const fields = {
  name: FormSchemaValidator.string().required(errorMessages.FieldRequired),
  registry: FormSchemaValidator.number().positive(),
  cpf: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .cpf(errorMessages.InvalidCPF),
  birthDate: FormSchemaValidator.string().required(errorMessages.FieldRequired),
  address: FormSchemaValidator.object().shape({
    street: FormSchemaValidator.string().required(errorMessages.FieldRequired),
    number: FormSchemaValidator.number()
      .positive()
      .required(errorMessages.FieldRequired),
    neighborhood: FormSchemaValidator.string().required(
      errorMessages.FieldRequired,
    ),
    city: FormSchemaValidator.string().required(errorMessages.FieldRequired),
    state: FormSchemaValidator.string()
      .uf(errorMessages.InvalidUF)
      .required(errorMessages.FieldRequired),
    zipcode: FormSchemaValidator.string()
      .required(errorMessages.FieldRequired)
      .zipCode(errorMessages.InvalidZipCode),
  }),
};

export default FormSchemaValidator.object().shape(fields);
