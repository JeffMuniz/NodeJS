import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import { errorMessages } from "@enums";

const fields = {
  phone: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .nullable()
    .phone(errorMessages.InvalidPhone),
  mother: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .nullable()
    .emptyField(errorMessages.FieldRequired)
    .specialCharacteres(errorMessages.InvalidCharacteres),
  birthDate: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .nullable()
    .birthDate(errorMessages.InvalidDate),
};

export default FormSchemaValidator.object().shape(fields);
