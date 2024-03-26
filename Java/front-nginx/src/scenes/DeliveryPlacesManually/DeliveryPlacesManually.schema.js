import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";
import { errorMessages } from "@enums";

const fields = {
  deliveryName: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .onlyLettersAndNumber(errorMessages.FieldRequired),
  zipcode: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .zipCode(errorMessages.InvalidZipCode),
  address: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .someCharactersAllowNumbers(errorMessages.FieldRequired),
  number: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .onlyNumbers(errorMessages.FieldRequired),
  complement: FormSchemaValidator.string().onlyLettersAndNumberAllowSpace(
    errorMessages.FieldRequired,
  ),
  neighborhood: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .someCharactersAllowNumbers(errorMessages.FieldRequired),
  city: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .someCharacters(errorMessages.FieldRequired),
  state: FormSchemaValidator.string().required(errorMessages.FieldRequired),
  firstPersonName: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .specialCharacteres(errorMessages.InvalidCharacteres),
  firstRg: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .onlyNumbers(errorMessages.FieldRequired),
  firstPhone: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .phone(errorMessages.InvalidPhone),
  secondPersonName: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .specialCharacteres(errorMessages.InvalidCharacteres),
  secondRg: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .onlyNumbers(errorMessages.FieldRequired),
  secondPhone: FormSchemaValidator.string()
    .required(errorMessages.FieldRequired)
    .phone(errorMessages.InvalidPhone),
};

export default FormSchemaValidator.object().shape(fields);
