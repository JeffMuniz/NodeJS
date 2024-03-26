import isNumber from "lodash/isNumber";
import isNil from "lodash/isNil";

/* eslint-disable no-restricted-globals */
export const containsString = (originalString, expectedString) => {
  if (
    expectedString &&
    String(originalString)
      .toLowerCase()
      .indexOf(String(expectedString).toLowerCase()) >= 0
  ) {
    return true;
  }

  return false;
};

export const removeWhiteSpaces = string => {
  if (!string) return "";

  return string.replace(/\s/g, "");
};

export const toOnlyNumbers = string => {
  if (!string) return "";
  return string.replace(/\D/g, "");
};

export const toOnlyAlpha = string => {
  if (!string) return "";
  return string.replace(/[^a-zA-Z]/g, "");
};

export const toOnlyLetters = string => {
  if (!string) return "";

  const withoutSpecialCharacters = string.replace(
    /[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g,
    "",
  );

  return removeWhiteSpaces(withoutSpecialCharacters)
    ? withoutSpecialCharacters
    : "";
};

export const toOnlyLettersAndNumbers = (string, allowSpace) => {
  if (!string) return "";

  const value = allowSpace
    ? string.replace(/[^a-zA-Z0-9 ]/g, "")
    : string.replace(/[^a-zA-Z0-9]/g, "");

  return removeWhiteSpaces(value) ? value : "";
};

export const removeSomeCharacters = (string, allowNumbers) => {
  if (!string) return "";

  const value = allowNumbers
    ? string.replace(/["'/!@#$%¨&*()_=+{[\]}:.,;?/\\|^~<>]/g, "")
    : string.replace(/[0-9"'/!@#$%¨&*()_=+{[\]}:.,;?/\\|^~<>]/g, "");

  return removeWhiteSpaces(value) ? value : "";
};

export const onlyLetters = string => {
  if (!string) return "";
  const alpha = /^[a-zA-Z-0-9]+$/;
  if (string.match(alpha)) {
    return string.replace(/^[a-záàâãéèêíïóôõöúçñ ]+$/g, "");
  }
};

export const formatPhone = string => {
  if (!string) return "";
  const onlyNumbers = string.replace(/\D/g, "");
  const formatNumbers = onlyNumbers.replace(/^(\d{2})(\d)/g, "($1) $2");
  const formattedNumber = formatNumbers.replace(/(\d)(\d{4})$/, "$1-$2");
  return formattedNumber;
};

export const toOnlyEmail = string => {
  const re = /\S+@\S+\.\S+/;
  return string.replace(re, "");
};

export const toString = number => (number ? number.toString() : "");

export const toCPFMask = string => {
  if (!string) return "";

  const positionMask = {
    3: ".",
    6: ".",
    9: "-",
  };

  const justNumbers = toOnlyNumbers(string);
  if (justNumbers.length < 11) return string;

  let CPF = "";
  justNumbers.split("").forEach((value, position) => {
    if (position > 10) return;

    if (positionMask[position]) {
      CPF += `${positionMask[position]}${value}`;
    } else CPF += value;
  });

  return CPF;
};

export const toCPFMaskOnFly = string => {
  if (!string) return "";

  const positionMask = {
    3: ".",
    6: ".",
    9: "-",
  };

  const justNumbers = toOnlyNumbers(string);
  if (justNumbers.length < 3) return string;

  let CPF = "";
  justNumbers.split("").forEach((value, position) => {
    if (position > 10) return;

    if (positionMask[position]) {
      CPF += `${positionMask[position]}${value}`;
    } else CPF += value;
  });

  return CPF;
};

export const toCNPJMask = string => {
  if (!string) return "";

  const positionMask = {
    2: ".",
    5: ".",
    8: "/",
    12: "-",
  };

  const justNumbers = toOnlyNumbers(string);
  if (justNumbers.length < 14) return string;

  let CNPJ = "";
  justNumbers.split("").forEach((value, position) => {
    if (position > 13) return;

    if (positionMask[position]) {
      CNPJ += `${positionMask[position]}${value}`;
    } else CNPJ += value;
  });

  return CNPJ;
};

// R$ 1.000,10 -> 1000,10
export const toMoney = value => {
  let localValue = value;
  if (typeof value !== "string") {
    localValue = String(value);
  }

  const convertedValue = parseFloat(
    localValue.replace(/[^0-9,]/g, "").replace(",", "."),
  );

  // eslint-disable-next-line no-restricted-global
  return isNaN(convertedValue) ? 0 : convertedValue;
};

export const toMoneyMask = value => {
  if (!isNil(value) && isNumber(+value) && !isNaN(value)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  }

  return "";
};

export const toNumberMask = value => {
  if (!isNil(value) && isNumber(+value) && !isNaN(value)) {
    return new Intl.NumberFormat("pt-BR", {
      useGrouping: true,
    }).format(value);
  }

  return "";
};

export const inputToMoney = string => {
  if (!string) return;
  const stringNumber = toOnlyNumbers(string);
  const toNumber = Number(stringNumber) / 100;
  return toMoneyMask(toNumber);
};

export const highlightCPF = (text, search) => {
  const searchTerm = toOnlyNumbers(search);
  const regexp = new RegExp(searchTerm, "g");
  const matches = [];
  let formatedText = text;

  let match = regexp.exec(text);
  while (match !== null) {
    matches.push(match.index);
    match = regexp.exec(text);
  }

  let counter = 0;
  matches.forEach(index => {
    formatedText = `${formatedText.slice(
      0,
      counter > 0 ? index + 7 : index,
    )}<b>${searchTerm}</b>${formatedText.slice(
      searchTerm.length + (counter > 0 ? index + 7 : index),
      formatedText.length,
    )}`;

    counter += 1;
  });

  counter = 1;
  let highlightedText = "";
  for (let charIndex = 0; charIndex < formatedText.length; charIndex += 1) {
    let cpfSeparator = "";
    if (!Number.isNaN(parseInt(formatedText[charIndex], 10))) {
      if (counter && counter % 9 === 0) {
        cpfSeparator = "-";
      } else if (counter && counter % 3 === 0) {
        cpfSeparator = ".";
      }

      counter += 1;
    }

    highlightedText = highlightedText
      .concat(formatedText[charIndex])
      .concat(cpfSeparator);
  }

  return highlightedText;
};

export const toRGMask = unmasked => {
  if (!unmasked) return "";
  if (unmasked.length < 8) return unmasked;
  const firstEights = unmasked.substring(0, 8);
  if (!/^\d+$/.test(firstEights)) return unmasked;

  const firstSequence = unmasked.substring(0, 2);
  const secondSequence = unmasked.substring(2, 5);
  const thirdSequence = unmasked.substring(5, 8);
  const digit = unmasked.substring(8, unmasked.length);

  return `${firstSequence}.${secondSequence}.${thirdSequence}${
    digit ? `-${digit}` : ""
  }`;
};

export const toApiMoney = string => toOnlyNumbers(string) / 100;

export const removeAccentuation = text => {
  const a = "àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-");
};

export const toCamelCase = string =>
  removeAccentuation(string)
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, "");

export const toZipCode = string =>
  string.replace(/(\d{2})(\d{3})(\d{3})/g, "$1.$2-$3");

export const mountAddress = ({
  logradouro = "",
  numero = "",
  bairro = "",
  cidade = "",
  estado = "",
  uf = "",
}) => {
  const street = logradouro && `${logradouro},`;
  const number = numero && `${numero} -`;
  const neighboorhood = bairro && `${bairro} -`;
  const city = cidade && `${cidade}/`;

  return `${street} ${number} ${neighboorhood} ${city}${estado || uf}`;
};

export const formatDateToApi = date =>
  date
    ? date
        .split("/")
        .reverse()
        .join("-")
    : "";

export const validateBirthDayIsValidade = date => {
  const formattedDate = formatDateToApi(date);

  const currentDate = new Date();
  const data = new Date(formattedDate);

  if (data.getTime() > currentDate.getTime()) return false;

  const regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  const result = regex.test(date);

  return result;
};

export const toZipCodeMask = value => {
  if (!value) return "";

  return value.replace(/(\d{5})(\d{3})/g, "$1-$2");
};

export const addZeroLeft = cpf => {
  let newCpf = cpf;

  if (cpf.length > 11) {
    return cpf;
  }

  if (cpf.length !== 11) {
    newCpf = `00000000000${cpf}`.slice(-11);
  }

  return newCpf;
};
