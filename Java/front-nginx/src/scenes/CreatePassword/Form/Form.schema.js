import { errorMessages } from "@enums";
import FormSchemaValidator from "src/modules/Form/FormSchemaValidator";

export const strongPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/,
);

const fields = {
  password: FormSchemaValidator.string()
    .matches(strongPassword, errorMessages.StrongPassword)
    .required(errorMessages.FieldRequired)
    .min(5)
    .max(15),
  confirmPassword: FormSchemaValidator.string()
    .oneOf([FormSchemaValidator.ref("password")], errorMessages.MatchPassword)
    .required(errorMessages.FieldRequired)
    .matches(strongPassword, errorMessages.StrongPassword),
};

export default FormSchemaValidator.object().shape(fields);
