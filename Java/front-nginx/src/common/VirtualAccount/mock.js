import store from "src/redux/configureStore";

const Mock = () => {
  const { selectedCompanyTree } = store.getState();

  const cnpj = ["59029648169634", "14613624000199", "12422759826490"];

  const result = cnpj.find(
    el => el === selectedCompanyTree.selectedCompany.cnpj,
  );

  if (result) {
    return "12.234,99";
  }

  return "0.000,00";
};

export default Mock;
