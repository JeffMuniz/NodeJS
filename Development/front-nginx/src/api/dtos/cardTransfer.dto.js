import { inputToMoney, toMoney } from "@utils";

export const cardTransferToApi = (data = {}) => {
  const object = {
    cnpj: data.cnpj.trim(),
    cpf: data.cpf.trim(),
    transferenciaSaldo: data.hasBalanceTransfer,
    transferenciaSaldoAlimentacao: data.hasFoodToMeal,
    transferenciaSaldoRefeicao: data.hasMealToFood,
    valorMinimoAlimentacao: data.foodValue
      ? toMoney(inputToMoney(data.foodValue))
      : 0.0,
    valorMinimoRefeicao: data.mealValue
      ? toMoney(inputToMoney(data.mealValue))
      : 0.0,
  };

  return { ...object };
};

export const cardTransferFromApi = (data = {}) => {
  const newData = data || {
    valorMinimoAlimentacao: "",
    valorMinimoRefeicao: "",
    transferenciaSaldo: false,
    transferenciaSaldoRefeicao: false,
    transferenciaSaldoAlimentacao: false,
  };

  const foodValueDefault = newData.transferenciaSaldoAlimentacao ? 0 : "";
  const mealValueDefault = newData.transferenciaSaldoRefeicao ? 0 : "";

  const object = {
    hasBalanceTransfer: newData.transferenciaSaldo,
    hasMealToFood: newData.transferenciaSaldoRefeicao,
    hasFoodToMeal: newData.transferenciaSaldoAlimentacao,
    foodValue: (
      newData.valorMinimoAlimentacao || foodValueDefault
    ).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    }),
    mealValue: (newData.valorMinimoRefeicao || mealValueDefault).toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 2,
      },
    ),
  };

  return { ...object };
};
