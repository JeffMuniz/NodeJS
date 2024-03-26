import React, { Fragment, Component } from "react";
import { SearchableDropdown, ClickOutsideListener } from "@common";
import { If } from "@utils";

import { isEmpty } from "lodash";

import {
  string,
  bool,
  arrayOf,
  shape,
  oneOfType,
  func,
  number,
} from "prop-types";
import { Col } from "react-styled-flexboxgrid";
import Arrow from "src/common/ArrowIcon/ArrowIcon";

import {
  LabelWrapper,
  LabelRow,
  Label,
  SelectedLabel,
  Container,
  Wrapper,
  SelectWrapper,
  Separator,
  Text,
  LabelText,
} from "./SubGroupSelector.styles";

class SubGroupSelector extends Component {
  constructor(props) {
    super(props);

    this.companyTriggerRef = React.createRef();
    this.parentCompanyTriggerRef = React.createRef();
  }

  render() {
    const {
      onClickGroupLabel,
      onClickCompanyLabel,
      groupName,
      subgroupLabelText,
      companyLabelText,
      showSubgroupSelect,
      showCompanySelect,
      showSubgroupLabel,
      showCompanyLabel,
      subgroups,
      companyList,
      onSelectSubgroup,
      onSelectCompany,
      searchSubgroup,
      searchCompany,
      selectedCompany,
      selectedSubgroup,
      showSubgroupIcon,
      showCompanyIcon,
    } = this.props;

    return (
      <Fragment>
        <Container>
          <LabelRow>
            <Col xs={12}>
              <Wrapper>
                <Text>Grupo:</Text>
                <SelectedLabel id="selected_group_name">
                  {groupName}
                </SelectedLabel>
                <Separator>|</Separator>
                <If test={showSubgroupLabel}>
                  <Fragment>
                    <LabelWrapper>
                      <div ref={this.parentCompanyTriggerRef}>
                        <Label
                          id="parentCompany_selector"
                          onClick={onClickGroupLabel}
                        >
                          <LabelText>{subgroupLabelText}</LabelText>
                          <If test={showSubgroupIcon}>
                            <Arrow isUp={showSubgroupSelect} />
                          </If>
                        </Label>
                      </div>
                      <SelectWrapper>
                        <ClickOutsideListener
                          id="dropdown_parentCompany"
                          handleClickOutside={onClickGroupLabel}
                          isListening={showSubgroupSelect}
                          triggerRef={this.parentCompanyTriggerRef}
                        >
                          <If test={showSubgroupSelect}>
                            <SearchableDropdown
                              id="parentCompany"
                              inputPlaceHolder="Digite o nome da Matriz"
                              options={subgroups}
                              onSelect={onSelectSubgroup}
                              searchBy="name"
                              selectedItem={selectedSubgroup}
                              onFilterOptions={searchSubgroup}
                            />
                          </If>
                        </ClickOutsideListener>
                      </SelectWrapper>
                    </LabelWrapper>
                    <Separator isVisible={!isEmpty(companyList)}>|</Separator>
                  </Fragment>
                </If>
                <If test={showCompanyLabel}>
                  <LabelWrapper>
                    <div ref={this.companyTriggerRef}>
                      <Label
                        id="company_selector"
                        onClick={onClickCompanyLabel}
                      >
                        <LabelText>{companyLabelText}</LabelText>
                        <If test={showCompanyIcon}>
                          <Arrow isUp={showCompanySelect} />
                        </If>
                      </Label>
                    </div>
                    <SelectWrapper>
                      <ClickOutsideListener
                        id="dropdown_company"
                        handleClickOutside={onClickCompanyLabel}
                        isListening={showCompanySelect}
                        triggerRef={this.companyTriggerRef}
                      >
                        <If test={showCompanySelect}>
                          <SearchableDropdown
                            id="company"
                            inputPlaceHolder="Digite um cnpj"
                            options={companyList}
                            onSelect={onSelectCompany}
                            searchBy="cnpj"
                            selectedItem={selectedCompany}
                            onFilterOptions={searchCompany}
                          />
                        </If>
                      </ClickOutsideListener>
                    </SelectWrapper>
                  </LabelWrapper>
                </If>
              </Wrapper>
            </Col>
          </LabelRow>
        </Container>
      </Fragment>
    );
  }
}

export default SubGroupSelector;

SubGroupSelector.propTypes = {
  groupName: string,
  subgroupLabelText: string,
  companyLabelText: string,
  showSubgroupSelect: bool,
  showCompanySelect: bool,
  showSubgroupLabel: bool,
  showCompanyLabel: bool,
  subgroups: arrayOf(
    shape({
      value: oneOfType([string, number]),
      description: string.isRequired,
    }),
  ),
  companyList: arrayOf(
    shape({
      value: oneOfType([string, number]),
      description: string.isRequired,
    }),
  ),
  searchSubgroup: func,
  searchCompany: func,
  onSelectSubgroup: func,
  onSelectCompany: func,
  onClickGroupLabel: func,
  onClickCompanyLabel: func,
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
  showSubgroupIcon: bool,
  showCompanyIcon: bool,
};

SubGroupSelector.defaultProps = {
  groupName: "",
  subgroupLabelText: "selecionar matriz",
  companyLabelText: "selecionar empresa",
  showSubgroupSelect: false,
  showCompanySelect: false,
  showSubgroupLabel: false,
  showCompanyLabel: false,
  subgroups: [],
  companyList: [],
  selectedSubgroup: {},
  selectedCompany: {},
  searchSubgroup: undefined,
  searchCompany: undefined,
  onSelectSubgroup: () => null,
  onSelectCompany: () => null,
  onClickGroupLabel: () => null,
  onClickCompanyLabel: () => null,
  showSubgroupIcon: true,
  showCompanyIcon: true,
};
