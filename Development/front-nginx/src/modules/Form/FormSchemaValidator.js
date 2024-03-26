import Yup from "yup";
import { CPF } from "cpf_cnpj";
import { parse } from "telefone";

import {
  toOnlyLetters,
  toOnlyLettersAndNumbers,
  toOnlyNumbers,
  removeSomeCharacters,
  validateBirthDayIsValidade,
} from "@utils";
import { states } from "@enums";
import { size } from "lodash";

import { formatPhone } from "@utils/stringHelper";

export const validateCpf = value => value && CPF.isValid(toOnlyNumbers(value));

export const validateZipCode = value => {
  if (!value) return;
  const regex = new RegExp(/^[0-9]{8}$/);
  return regex.test(toOnlyNumbers(value));
};

export const validateUf = value => {
  if (!value) return;

  const test = Object.keys(states).some(
    el => states[el].name === value.toUpperCase(),
  );

  return test;
};

export const validatePhone = value => {
  if (!value) return true;

  const phone = formatPhone(value);

  const returnedValue = parse(phone);

  if (returnedValue) {
    return true;
  }

  return false;
};

export const validateBirthDate = value => {
  if (!value) return true;

  const birthDate = validateBirthDayIsValidade(value);
  return birthDate;
};

export const validateEmptyField = value => {
  if (!value) return true;

  if (value.trim()) return true;

  return false;
};

export const validateSpecialCharacteres = value => {
  if (!value) return true;

  if (/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]*$/.test(value) === false) {
    if (toOnlyLetters(value)) {
      return true;
    }
    return false;
  }

  return true;
};

export const validateOnlyLettersAndNumber = value => {
  if (!value) return true;

  if (toOnlyLettersAndNumbers(value, false)) {
    return true;
  }

  return false;
};

export const validateOnlyLettersAndNumberAllowSpace = value => {
  if (!value) return true;

  if (toOnlyLettersAndNumbers(value, true)) {
    return true;
  }
  return false;
};

export const validateOnlyNumbers = value => {
  if (!value) return true;

  if (toOnlyNumbers(value)) {
    return true;
  }
  return false;
};

export const validadeSomeCharacters = value => {
  if (!value) return true;

  if (removeSomeCharacters(value, false)) {
    return true;
  }
  return false;
};

export const validadeSomeCharactersAllowNumbers = value => {
  if (!value) return true;

  if (removeSomeCharacters(value, true)) {
    return true;
  }
  return false;
};

Yup.addMethod(Yup.string, "zipCode", function testZipCode(message) {
  return this.test({
    name: "zipCode",
    message,
    test: validateZipCode,
  });
});

Yup.addMethod(Yup.string, "cpf", function testCPF(message) {
  return this.test({
    name: "cpf",
    message,
    test: validateCpf,
  });
});

Yup.addMethod(Yup.string, "uf", function testUf(message) {
  return this.test({
    name: "uf",
    message,
    test: validateUf,
  });
});

Yup.addMethod(Yup.string, "maxCpfEntries", function testUf(message) {
  return this.test({
    name: "maxCpfEntries",
    message,
    test: function testLorem(values) {
      if (!size(values)) {
        return true;
      }

      return size(values.split(/[\r\n a-zA-Z]+/).filter(el => el !== "")) > 50
        ? null
        : true;
    },
  });
});

Yup.addMethod(Yup.string, "phone", function testPhone(message) {
  return this.test({
    name: "phone",
    message,
    test: validatePhone,
  });
});

Yup.addMethod(Yup.string, "birthDate", function testBirthDate(message) {
  return this.test({
    name: "birthDate",
    message,
    test: validateBirthDate,
  });
});

Yup.addMethod(Yup.string, "emptyField", function testEmptyField(message) {
  return this.test({
    name: "emptyField",
    message,
    test: validateEmptyField,
  });
});

Yup.addMethod(Yup.string, "specialCharacteres", function testSpecialCharacteres(
  message,
) {
  return this.test({
    name: "specialCharacteres",
    message,
    test: validateSpecialCharacteres,
  });
});

Yup.addMethod(Yup.string, "onlyNumbers", function testOnlyNumbers(message) {
  return this.test({
    name: "onlyNumbers",
    message,
    test: validateOnlyNumbers,
  });
});

Yup.addMethod(
  Yup.string,
  "onlyLettersAndNumber",
  function testOnlyLettersAndNumber(message) {
    return this.test({
      name: "onlyLettersAndNumber",
      message,
      test: validateOnlyLettersAndNumber,
    });
  },
);

Yup.addMethod(
  Yup.string,
  "onlyLettersAndNumberAllowSpace",
  function testOnlyLettersAndNumberAllowSpace(message) {
    return this.test({
      name: "onlyLettersAndNumberAllowSpace",
      message,
      test: validateOnlyLettersAndNumberAllowSpace,
    });
  },
);

Yup.addMethod(Yup.string, "someCharacters", function testSomeCharacters(
  message,
) {
  return this.test({
    name: "someCharacters",
    message,
    test: validadeSomeCharacters,
  });
});

Yup.addMethod(
  Yup.string,
  "someCharactersAllowNumbers",
  function testSomeCharactersAllowNumbers(message) {
    return this.test({
      name: "someCharactersAllowNumbers",
      message,
      test: validadeSomeCharactersAllowNumbers,
    });
  },
);

export default Yup;
