import { FormSchemaValidator } from "src/modules/Form";

const FormSchema = {
  reason: FormSchemaValidator.string().required("Selecione um motivo"),
};

export default FormSchemaValidator.object().shape(FormSchema);
