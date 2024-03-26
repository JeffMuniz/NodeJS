import { FormSchemaValidator } from "src/modules/Form";
import { inputToMoney, toOnlyNumbers } from "@utils";
import { isNull } from "lodash";

export const fields = {
  va: "va",
  vr: "vr",
  valueDefault: "R$ 0,00",
  meal: "meal",
  food: "food",
};

const checkValue = value => value !== undefined;

const FormSchema = FormSchemaValidator.object().shape({
  cpfs: FormSchemaValidator.array().of(
    FormSchemaValidator.object().shape({
      [fields.vr]: FormSchemaValidator.mixed()
        .transform((value, originalValue) =>
          isNull(originalValue) ? value : inputToMoney(value),
        )
        .test("match", "should va undefined value", function match() {
          const { va, vr } = this.parent;
          return va !== undefined || vr !== [fields.valueDefault].toString();
        })
        .test("match", "should va default value", function match() {
          const { va, vr } = this.parent;
          return va !== [fields.valueDefault].toString() || vr !== undefined;
        })
        .test("match", "should va value number", function match() {
          const { va, vr } = this.parent;
          return checkValue(vr) || toOnlyNumbers(va);
        })
        .test("match", "should va null value", function match() {
          const { va, vr } = this.parent;
          return !isNull(va) || vr !== [fields.valueDefault].toString();
        })
        .test("match", "should products diferent", function match() {
          const { va, vr } = this.parent;
          return (
            vr !== [fields.valueDefault].toString() ||
            va !== [fields.valueDefault].toString()
          );
        }),

      [fields.va]: FormSchemaValidator.mixed()
        .transform((value, originalValue) =>
          isNull(originalValue) ? value : inputToMoney(value),
        )
        .test("match", "should vr undefined value", function match() {
          const { va, vr } = this.parent;
          return vr !== [fields.valueDefault].toString() || va !== undefined;
        })
        .test("match", "should vr default value", function match() {
          const { va, vr } = this.parent;
          return va !== [fields.valueDefault].toString() || vr !== undefined;
        })
        .test("match", "should vr value number", function match() {
          const { va, vr } = this.parent;
          return checkValue(va) || toOnlyNumbers(vr);
        })
        .test("match", "should va null value", function match() {
          const { va, vr } = this.parent;
          return !isNull(vr) || va !== [fields.valueDefault].toString();
        })

        .test("match", "should products diferent", function match() {
          const { va, vr } = this.parent;
          return (
            vr !== [fields.valueDefault].toString() ||
            va !== [fields.valueDefault].toString()
          );
        }),
    }),
  ),
});

export default FormSchema;
