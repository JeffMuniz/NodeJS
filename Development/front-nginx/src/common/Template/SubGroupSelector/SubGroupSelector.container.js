import React, { Component, Fragment } from "react";
import { number, shape, arrayOf, string, func, oneOfType } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { WebPaths, Routes } from "src/routes/consts";
import { CNPJ } from "cpf_cnpj";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import * as companiesActions from "src/redux/modules/companies/actions/companies";
import * as companyTreeActions from "src/redux/modules/selectedCompanyTree/actions/selectedCompanyTree";
import { getSubgroupsTree as getSubgroupsAction } from "src/redux/modules/subgroup/actions/subgroup";
import * as ModalActions from "src/redux/modules/modal/actions/modal";
import { resetAuth as resetAuthAction } from "src/redux/modules/session/actions/session";
import { getGroups } from "src/redux/modules/group/actions/group";

import store from "src/redux/configureStore";

import SubGroupSelector from "./SubGroupSelector";
import GroupSelect from "../GroupSelect/GroupSelect.container";

export class SubGroupSelectorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubgroupSelect: false,
      showCompanySelect: false,
    };
  }

  async componentDidMount() {
    const { getGroupList, idUser } = this.props;

    await getGroupList(idUser);

    if (this.checksIfGroupListIsEmpty()) {
      const { history, resetAuth } = this.props;

      await resetAuth();

      history.push(WebPaths[Routes.LOGIN]);

      return;
    }

    if (!this.checksIfGroupIsSelected() || this.checksGroupsInconsistencies()) {
      if (this.getGroupListLength() === 1) {
        await this.autoSelectGroup();
      } else {
        this.openSelectGroupModal();

        return;
      }
    }

    if (this.checksIfGroupIsSelected() && !this.checksGroupsInconsistencies()) {
      this.fetchBaseDataCompany();
    }
  }

  async componentDidUpdate(prevProps) {
    const { selectedGroup } = this.props;

    if (
      this.checksIfGroupIsSelected() &&
      prevProps.selectedGroup.id !== selectedGroup.id
    ) {
      await this.fetchSubgroup({ idGroup: selectedGroup.id });
      this.autoSelectSubgroup();
    }
  }

  onSelectSubgroup = async (selectedSubgroup, isAutoSelected = false) => {
    if (!isAutoSelected) this.toggleSubgroupSelect();
    const { updateSubgroup } = this.props;
    updateSubgroup({ selectedSubgroup });
    await this.fetchCompany({ selectedSubgroup });

    const {
      companyState: { companyList },
    } = this.props;

    if (isAutoSelected || companyList.length === 1) this.autoSelectCompany();

    if (companyList.length <= 1) return;

    this.toggleCompanySelect();
  };

  onSelectCompany = async selectedCompany => {
    const { updateCompany } = this.props;

    await updateCompany({ selectedCompany });
    this.setState({ showCompanySelect: false });
  };

  getSubgroupLabelText = (subgroup, subgroups) => {
    if (this.hasSubgroup(subgroup, subgroups)) {
      return "selecionar matriz";
    }
    const { id: selectedSubgroupId } = subgroup;
    const selectedSubgroup = subgroups.find(
      group => group.id === selectedSubgroupId,
    );

    return selectedSubgroup ? selectedSubgroup.name : "selecionar matriz";
  };

  getCompanyLabelText = (company, companyList) => {
    if (this.hasCompany(company, companyList)) {
      return "selecionar empresa";
    }
    const { id: selectedCompanyId } = company;
    const selectedCompany = companyList.find(
      ({ id: companyId }) => companyId === selectedCompanyId,
    );

    return selectedCompany
      ? `${CNPJ.format(selectedCompany.cnpj)}`
      : "selecionar empresa";
  };

  getGroupListLength = () => {
    const { groupList } = this.props;

    return groupList.length;
  };

  autoSelectGroup = async () => {
    const {
      groupList,
      idUser,
      updateSelectedGroupParams,
      updateSelectedGroup,
    } = this.props;

    let selectedGroupParams = {};
    const [group] = groupList;

    try {
      selectedGroupParams = await updateSelectedGroupParams({
        idGroup: group.id,
        idUser,
      });
    } catch (error) {
      selectedGroupParams = { params: {} };
    }

    const selectedGroup = {
      ...group,
      ...selectedGroupParams,
    };
    await updateSelectedGroup({ selectedGroup });
  };

  hasCompany = (company, companyList) =>
    !company || !company.id || !companyList || !companyList.length;

  hasSubgroup = (subgroup, subgroups) =>
    !subgroup || !subgroup.id || !subgroups || !subgroups.length;

  fetchSubgroup = async ({ idGroup: selectedGroupId }) => {
    const { selectedGroup, getSubgroupsTree, idUser } = this.props;

    const idGroup = selectedGroupId || selectedGroup.id;

    await getSubgroupsTree({ idGroup, idUser });
  };

  fetchCompany = async ({ selectedSubgroup: subgroup }) => {
    const {
      subgroupTree: { subgroups },
      selectedSubgroup,
      setCompanies,
    } = this.props;

    const { id: idSubgroup } = subgroup || selectedSubgroup;

    const { companies } = subgroups.find(sub => sub.id === idSubgroup) || {
      companies: [],
    };

    await setCompanies({ companies });
  };

  selectGroupTree = () => {
    const {
      updateCompanyTree,
      selectedGroup,
      selectedSubgroup,
      selectedCompany,
    } = this.props;

    updateCompanyTree({
      selectedGroup,
      selectedSubgroup,
      selectedCompany,
    });
  };

  autoSelectSubgroup = async () => {
    const {
      subgroupTree: { subgroups },
    } = this.props;
    const isAutoSelected = true;

    if (isEmpty(subgroups)) {
      return;
    }

    const [subgroup] = subgroups;

    await this.onSelectSubgroup(subgroup, isAutoSelected);
  };

  autoSelectCompany = () => {
    const {
      companyState: { companyList },
    } = this.props;

    if (isEmpty(companyList)) {
      return;
    }

    const [company] = companyList;

    this.onSelectCompany(company);
  };

  toggleSubgroupSelect = () => {
    this.setState({
      showSubgroupSelect: !this.state.showSubgroupSelect, //eslint-disable-line
      showCompanySelect: false,
    });
  };

  toggleCompanySelect = () =>
    this.setState({
      showSubgroupSelect: false,
      showCompanySelect: !this.state.showCompanySelect, //eslint-disable-line
    });

  parsesubGroupsToOption = list =>
    list.map(item => ({
      id: item.id,
      name: item.name,
      value: item.id,
      description: item.name,
    }));

  parseCompanyListToOption = list =>
    list.map(item => ({
      id: item.id,
      name: item.name,
      value: item.id,
      cnpj: item.cnpj,
      description: CNPJ.format(item.cnpj),
    }));

  allowedToShowAllLayers = () => {
    const allowedPagesToSelectGroup = [
      WebPaths[Routes.EMPLOYEES],
      WebPaths[Routes.INCOME_REPORT],
      WebPaths[Routes.VIRTUAL_ACCOUNT],
    ];

    const currentRoute = window.location.pathname;

    if (currentRoute === WebPaths[Routes.FINANCES]) {
      const {
        tabs: { selectedTab },
      } = store.getState();

      return selectedTab !== "Meus Pagamentos";
    }

    return allowedPagesToSelectGroup.some(
      route => currentRoute.indexOf(route) >= 0,
    );
  };

  showSubgroupLabel = subgroups => this.allowedToShowAllLayers() && subgroups;

  showCompanyLabel = companies => this.allowedToShowAllLayers() && companies;

  openSelectGroupModal = () => {
    const { openModal } = this.props;

    openModal({ children: <GroupSelect />, hideCloseButton: true });
  };

  handleLabelClick = (toggleFunction, options) => () =>
    options.length > 1 ? toggleFunction() : () => null;

  showLabelIcon = options => options && options.length > 1;

  fetchBaseDataCompany = async () => {
    const { selectedGroup, selectedSubgroup, selectedCompany } = this.props;

    await this.fetchSubgroup({ idGroup: selectedGroup.id });

    if (!selectedSubgroup || !selectedSubgroup.name) {
      return this.autoSelectSubgroup();
    }

    if (selectedSubgroup && !selectedCompany) {
      return this.onSelectSubgroup(selectedSubgroup, true);
    }

    await this.fetchCompany({ selectedSubgroup });

    this.selectGroupTree();
  };

  checksIfGroupIsSelected = () => {
    const { selectedGroup } = this.props;

    return !!get(selectedGroup, "id");
  };

  checksIfGroupListIsEmpty = () => {
    const { groupList } = this.props;

    return !groupList || !groupList.length;
  };

  checksGroupsInconsistencies = () => {
    const { groupList, selectedGroup } = this.props;

    return (
      this.checksIfGroupIsSelected() &&
      !groupList.find(group => group.id === selectedGroup.id)
    );
  };

  render() {
    const { showSubgroupSelect, showCompanySelect } = this.state;
    const {
      subgroupTree,
      companyState,
      selectedGroup,
      selectedSubgroup,
      selectedCompany,
    } = this.props;

    const groupName = selectedGroup.name;

    return (
      <Fragment>
        <SubGroupSelector
          onClickGroupLabel={this.handleLabelClick(
            this.toggleSubgroupSelect,
            subgroupTree.subgroups,
          )}
          showSubgroupIcon={this.showLabelIcon(subgroupTree.subgroups)}
          onClickCompanyLabel={this.handleLabelClick(
            this.toggleCompanySelect,
            companyState.companyList,
          )}
          showCompanyIcon={this.showLabelIcon(companyState.companyList)}
          subgroupLabelText={this.getSubgroupLabelText(
            selectedSubgroup,
            subgroupTree.subgroups,
          )}
          companyLabelText={this.getCompanyLabelText(
            selectedCompany,
            companyState.companyList,
          )}
          showSubgroupLabel={this.showSubgroupLabel(subgroupTree.subgroups)}
          showCompanyLabel={this.showCompanyLabel(companyState.companyList)}
          showSubgroupSelect={showSubgroupSelect}
          showCompanySelect={showCompanySelect}
          subgroups={this.parsesubGroupsToOption(subgroupTree.subgroups)}
          selectedSubgroup={selectedSubgroup}
          selectedCompany={selectedCompany}
          companyList={this.parseCompanyListToOption(companyState.companyList)}
          onSelectSubgroup={this.onSelectSubgroup}
          onSelectCompany={this.onSelectCompany}
          groupName={groupName}
        />
      </Fragment>
    );
  }
}

export function mapStateToProps({
  selectedCompanyTree: { selectedGroup, selectedSubgroup, selectedCompany },
  user: {
    profile: {
      data: { id: idUser },
    },
    isAuthenticated,
  },
  group: {
    groupState: { groupList, requestStatus: groupRequestStatus },
  },
  subgroup: {
    subgroupTree: { subgroups },
  },
  companies: {
    companyState: { companyList },
  },
  modal: { showModal },
}) {
  return {
    subgroupTree: {
      subgroups,
    },
    companyState: {
      companyList,
    },
    selectedGroup,
    selectedSubgroup,
    selectedCompany,
    isAuthenticated,
    idUser,
    groupList,
    groupStatus: groupRequestStatus,
    modalOpen: showModal,
  };
}

const mapDispatchToProps = {
  setCompanies: companiesActions.setCompanies,
  updateSubgroup: companyTreeActions.updateSelectedSubgroup,
  updateCompany: companyTreeActions.updateSelectedCompany,
  updateCompanyTree: companyTreeActions.updateSelectedCompanyTree,
  updateSelectedGroup: companyTreeActions.updateSelectedGroup,
  updateSelectedGroupParams: companyTreeActions.updateSelectedGroupParams,
  getSubgroupsTree: getSubgroupsAction,
  openModal: ModalActions.OpenModal,
  closeModal: ModalActions.CloseModal,
  getGroupList: getGroups,
  resetAuth: resetAuthAction,
};

SubGroupSelectorContainer.propTypes = {
  updateSelectedGroupParams: func.isRequired,
  updateSelectedGroup: func.isRequired,
  subgroupTree: shape({
    subgroups: arrayOf(shape({})),
  }),
  companyState: shape({
    companyList: arrayOf(shape({})),
  }),
  selectedGroup: shape({
    name: string,
    id: number,
  }),
  selectedSubgroup: shape({
    id: number,
    name: string,
    description: string,
    value: oneOfType([number, string]),
  }),
  selectedCompany: shape({
    id: number,
    name: string,
    description: string,
    value: oneOfType([number, string]),
  }),
  updateCompanyTree: func,
  idUser: string.isRequired,
  updateSubgroup: func,
  updateCompany: func,
  getSubgroupsTree: func.isRequired,
  setCompanies: func.isRequired,
  openModal: func.isRequired,
  resetAuth: func.isRequired,
  groupList: arrayOf(
    shape({
      idPermission: number,
      id: number,
      name: string,
    }),
  ),
  getGroupList: func,
};

SubGroupSelectorContainer.defaultProps = {
  subgroupTree: {
    subgroups: [],
  },
  companyState: {
    companyList: [],
  },
  selectedGroup: {
    name: "",
    id: null,
  },
  groupList: [],
  selectedSubgroup: {},
  selectedCompany: {},
  updateCompanyTree: () => null,
  updateSubgroup: () => null,
  updateCompany: () => null,
  getGroupList: () => null,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubGroupSelectorContainer),
);
