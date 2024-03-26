import { validateCpf } from "./FormSchemaValidator";

describe("FormSchemaValidator", () => {
  it("should return true when pass a valid cpf", () => {
    // given
    const cpf = "82137575728";

    // when
    const result = validateCpf(cpf);

    // expect
    expect(result).toBeTruthy();
  });

  it("should return false when pass a invalid cpf", () => {
    // given
    const cpf = "00011122233";

    // when
    const result = validateCpf(cpf);

    // expect
    expect(result).toBeFalsy();
  });

  it("should return false when not pass a cpf", () => {
    // given
    const cpf = null;

    // when
    const result = validateCpf(cpf);

    // expect
    expect(result).toBeFalsy();
  });
});
