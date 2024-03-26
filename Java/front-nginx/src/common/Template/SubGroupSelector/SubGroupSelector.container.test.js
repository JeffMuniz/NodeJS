import React from "react";
import TestRenderer from "react-test-renderer";
import { CNPJ } from "cpf_cnpj";
import { SubGroupSelectorContainer } from "./SubGroupSelector.container";

jest.mock("./SubGroupSelector", () => "SubGroupSelector");
jest.mock("../GroupSelect/GroupSelect.container", () => "GroupSelect");

let testRenderer = null;
let instance = null;

const defaultProps = {
  getSubGroups: jest.fn(),
  setCompanies: jest
    .fn()
    .mockImplementation(
      () => new Promise(resolve => process.nextTick(() => resolve())),
    ),
  updateCompanyTree: jest.fn(),
  updateSubgroup: jest.fn(),
  updateCompany: jest.fn(),
  selectedGroup: { id: 1 },
  updateSelectedGroupParams: jest.fn(),
  updateSelectedGroup: jest.fn(),
  idUser: "1",
  getSubgroupsTree: jest.fn(),
  openModal: jest.fn(),
  closeModal: jest.fn(),
  resetAuth: jest.fn(),
  modalOpen: false,
  groupStatus: "",
  history: {},
};

beforeEach(() => {
  testRenderer = TestRenderer.create(
    <SubGroupSelectorContainer {...defaultProps} />,
  );
  instance = testRenderer.getInstance();
});

describe("SubGroupSelector container", () => {
  it("should get parent company list when component update", () => {
    // given
    const newProps = {
      ...defaultProps,
      subgroupTree: {
        subgroups: [],
      },
      selectedGroup: { id: 2 },
      getSubgroupsTree: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // then
    expect(instance.props.getSubgroupsTree).toBeCalled();
  });

  it("should not get parent company list when component update", () => {
    // given
    const newProps = {
      ...defaultProps,
      subgroupsState: {
        subGroups: [
          {
            id: 1,
            name: "Grupo",
            companyList: [],
          },
        ],
      },
      selectedGroup: { id: 1 },
      getSubGroups: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // then
    expect(instance.props.getSubGroups).not.toBeCalled();
  });

  it("should not get parent company list when parent company list is already filled", () => {
    // given
    const newProps = {
      ...defaultProps,
      subgroupsState: {
        subGroups: [{ id: 1 }],
        nextPage: 0,
      },
      getSubGroups: jest.fn(),
    };

    // when
    testRenderer = TestRenderer.create(
      <SubGroupSelectorContainer {...newProps} />,
    );
    instance = testRenderer.getInstance();

    // then
    expect(instance.props.getSubGroups).not.toBeCalled();
  });

  it("should not show parent company label when there is no one parent company", () => {
    // given
    const subgroups = null;

    // when
    const result = instance.showSubgroupLabel(subgroups);

    // then
    expect(result).toBeFalsy();
  });

  it("should not show subgroup label when there is only one parent company", () => {
    // given
    const subgroups = [{ id: 1 }];

    // when
    const result = instance.showSubgroupLabel(subgroups);

    // then
    expect(result).toBeFalsy();
  });

  it("should show parent company label when there is more than one parent company", () => {
    // given
    const subgroups = [{ id: 1 }, { id: 2 }];
    instance.allowedToShowAllLayers = jest.fn(() => true);

    // when
    const result = instance.showSubgroupLabel(subgroups);

    // then
    expect(result).toBeTruthy();
  });

  it("should not show company label when there is no one company", () => {
    // given
    const companies = null;

    // when
    const result = instance.showCompanyLabel(companies);

    // then
    expect(result).toBeFalsy();
  });

  it("should not show company label when there is only one  company", () => {
    // given
    const companies = [{ id: 1 }];

    // when
    const result = instance.showCompanyLabel(companies);

    // then
    expect(result).toBeFalsy();
  });

  it("should show company label when there is more than one  company", () => {
    // given
    const companies = [{ id: 1 }, { id: 2 }];
    instance.allowedToShowAllLayers = jest.fn(() => true);
    // when
    const result = instance.showCompanyLabel(companies);

    // then
    expect(result).toBeTruthy();
  });

  it("should update company tree when onSelectSubgroup is called", () => {
    // given
    const selectedSubgroup = 1;
    // when
    instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.props.updateSubgroup).toBeCalledWith({
      selectedSubgroup,
    });
  });

  it("should toggle parent company select when onSelectSubgroup is called", async () => {
    // given
    const selectedSubgroup = 1;
    instance.toggleSubgroupSelect = jest.fn();

    // when
    await instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.toggleSubgroupSelect).toBeCalled();
  });

  it("should toggle company select when onSelectSubgroup is called and has more than one company", async () => {
    // given
    const selectedSubgroup = 1;
    const newProps = {
      ...defaultProps,
      companyState: {
        companyList: [{ id: 1 }, { id: 2 }],
      },
      setCompanies: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.toggleCompanySelect = jest.fn();

    // when
    await instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.toggleCompanySelect).toBeCalled();
  });

  it("should not toggle company select when onSelectSubgroup is called and has only one company", async () => {
    // given
    const selectedSubgroup = 1;
    const newProps = {
      ...defaultProps,
      companyState: {
        companyList: [{ id: 1 }],
      },
      setCompanies: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.toggleCompanySelect = jest.fn();

    // when
    await instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.toggleCompanySelect).not.toBeCalled();
  });

  it("should select company when onSelectSubgroup is called and has only one company", async () => {
    // given
    const selectedSubgroup = 1;
    const newProps = {
      ...defaultProps,
      companyState: {
        companyList: [{ id: 1 }],
      },
      setCompanies: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.onSelectCompany = jest.fn();
    instance.toggleSubgroupSelect = jest.fn();

    // when
    await instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.onSelectCompany).toBeCalledWith(
      newProps.companyState.companyList[0],
    );
  });

  it("should not select company and toggle company select when onSelectSubgroup is called and has no company", async () => {
    // given
    const selectedSubgroup = 1;
    const newProps = {
      ...defaultProps,
      companyState: {
        companyList: [],
      },
      setCompanies: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.onSelectCompany = jest.fn();
    instance.toggleCompanySelect = jest.fn();

    // when
    await instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.toggleCompanySelect).not.toBeCalled();
    expect(instance.onSelectCompany).not.toBeCalled();
  });

  it("should get company list when onSelectSubgroup is called", () => {
    // given
    const selectedSubgroup = { id: 1 };
    instance.props.subgroupTree.subgroups = [
      {
        id: 1,
        companies: [{ id: 1 }],
      },
    ];
    // when
    instance.onSelectSubgroup(selectedSubgroup);

    // then
    expect(instance.props.setCompanies).toBeCalledWith({
      companies: [{ id: 1 }],
    });
  });

  it("should update company tree when onSelectCompany is called", () => {
    // given
    const selectedCompany = 1;
    instance.props.selectedSubgroup = 1;
    // when
    instance.onSelectCompany(selectedCompany);

    // then
    expect(instance.props.updateCompany).toBeCalledWith({
      selectedCompany,
    });
  });

  it("should return default text when getSubgroupLabelText is called with no selectedSubgroupId", () => {
    // given
    const defaultText = "selecionar matriz";

    // when
    const result = instance.getSubgroupLabelText();

    // then
    expect(result).toEqual(defaultText);
  });

  it("should return default text when getSubgroupLabelText is called and a company with selectedSubgroupId is not found", () => {
    // given
    const defaultText = "selecionar matriz";
    const selectedSubgroupId = 2;
    const subGroups = [{ id: 1, name: "Another Company" }];

    // when
    const result = instance.getSubgroupLabelText(selectedSubgroupId, subGroups);

    // then
    expect(result).toEqual(defaultText);
  });

  it("should return parent company name when getSubgroupLabelText is called and a company with selectedSubgroupId is found", () => {
    // given
    const expectedResult = "test";
    const selectedSubgroup = { id: 1 };
    const subGroups = [{ id: 1, name: expectedResult }];

    // when
    const result = instance.getSubgroupLabelText(selectedSubgroup, subGroups);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should return default text when getCompanyLabelText is called with no selectedCompanyId", () => {
    // given
    const defaultText = "selecionar empresa";

    // when
    const result = instance.getCompanyLabelText();

    // then
    expect(result).toEqual(defaultText);
  });

  it("should return default text when getCompanyLabelText is called and a company with selectedCompanyId is not found", () => {
    // given
    const defaultText = "selecionar empresa";
    const selectedCompanyId = 2;
    const companyList = [{ id: 1, cnpj: "0000000000000" }];

    // when
    const result = instance.getCompanyLabelText(selectedCompanyId, companyList);

    // then
    expect(result).toEqual(defaultText);
  });

  it("should return company cnpj when getCompanyLabelText is called and a company with selectedCompanyId is found", () => {
    // given
    const testCnpj = "00000000000000";
    const expectedResult = CNPJ.format(testCnpj);
    const selectedCompany = { id: 1 };
    const companyList = [{ id: 1, cnpj: testCnpj }];

    // when
    const result = instance.getCompanyLabelText(selectedCompany, companyList);

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should auto select company and update company tree when autoSelectSubgroup is called and there is only one parent company", async () => {
    // given
    const newProps = {
      ...defaultProps,
      subgroupsState: {
        subGroups: [{ id: 1 }],
        nextPage: 0,
      },
      updateSubgroup: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();
    instance.fetchCompany = jest
      .fn()
      .mockImplementation(
        () => new Promise(resolve => process.nextTick(() => resolve())),
      );
    instance.autoSelectCompany = jest.fn();

    // when
    await instance.autoSelectSubgroup();

    // then
    expect(instance.props.updateSubgroup).toBeCalledWith({
      selectedSubgroup: { companies: [{ id: 1 }], id: 1 },
    });
  });

  it("should update company tree when autoSelectCompany is called and there is only one company", async () => {
    // given
    const newProps = {
      ...defaultProps,
      companyState: {
        companyList: [{ id: 1 }],
        nextPage: 0,
      },
      setCompanies: jest.fn(),
      updateCompany: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // when
    await instance.autoSelectCompany();

    // then
    expect(instance.props.updateCompany).toBeCalledWith({
      selectedCompany: newProps.companyState.companyList[0],
    });
  });

  it("should not update company tree when autoSelectCompany is called and there is more than one company", async () => {
    // given
    const newProps = {
      ...defaultProps,
      companyState: {
        companyList: [{ id: 1 }, { id: 2 }],
        nextPage: 0,
      },
      updateCompanyTree: jest.fn(),
    };

    testRenderer.update(<SubGroupSelectorContainer {...newProps} />);
    instance = testRenderer.getInstance();

    // when
    await instance.autoSelectCompany();

    // then
    expect(instance.props.updateCompanyTree).not.toBeCalled();
  });
});
