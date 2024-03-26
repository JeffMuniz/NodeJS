import createNumberMask from "text-mask-addons/dist/createNumberMask";

const currencyMask = createNumberMask({
  prefix: "R$ ",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
  decimalLimit: 2,
  integerLimit: 9,
  allowNegative: false,
  allowLeadingZeroes: false,
});

export default { currencyMask };
