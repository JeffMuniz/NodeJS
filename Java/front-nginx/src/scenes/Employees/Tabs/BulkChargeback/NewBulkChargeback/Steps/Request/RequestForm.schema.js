import { errorMessages } from "@enums";

import { FormSchemaValidator } from "src/modules/Form";

export const fields = {
  cpfs: "cpfs",
  reason: "reason",
};

export const initialValues = {
  [fields.cpfs]: "",
  [fields.reason]: "",
};

const schema = {
  [fields.cpfs]: FormSchemaValidator.string()
    .maxCpfEntries("É permitido apenas 50 CPFs")
    .required(errorMessages.AtLeastOneCpfRequired),

  [fields.reason]: FormSchemaValidator.string().required(
    errorMessages.FieldReason,
  ),
};

export default FormSchemaValidator.object().shape(schema);
