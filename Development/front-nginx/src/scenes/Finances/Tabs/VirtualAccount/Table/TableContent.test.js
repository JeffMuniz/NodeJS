import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TableContent from "./TableContent";

const data = {
  number: 0,
  size: 10,
  totalPages: 1,
  numberOfElements: 1,
  totalElements: 1,
  hasContent: true,
  first: true,
  last: true,
  nextPage: 0,
  previousPage: 0,
  content: [
    {
      id: 199999,
      cnpj: "22617988000175",
      data: "2018-12-26T19:12:00.000Z",
      razaoSocial: "Empresa 6295 2",
      origem: "Estorno",
      descricao: "Aqui vai uma descrição",
      valor: 1.5,
      chave: "ESTORNO",
    },
  ],
};

const defaultProps = {
  data: data.content,
};

describe("Reports - Table - TableContent", () => {
  it("should render TableContent", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<TableContent {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
