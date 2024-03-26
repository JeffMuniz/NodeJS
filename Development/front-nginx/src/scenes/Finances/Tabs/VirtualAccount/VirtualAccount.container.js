import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { shape } from "prop-types";

import { ContainerWrapper } from "@base";
import { RowOrder, VirtualAccount as Account } from "@common";
import { toCNPJMask } from "@utils";
import Table from "./Table/Table.container";

import {
  WrapperCompany,
  CompanyTitle,
  CompanySubTitle,
  WrapperOrder,
} from "./VirtualAccount.styles";

export class VirtualAccount extends PureComponent {
  render() {
    const { company } = this.props;

    const CompanyDetails = () => (
      <WrapperCompany id="company-wrapper">
        <CompanyTitle id="company-title">{company.name}</CompanyTitle>
        <CompanySubTitle id="company-cnpj">
          {company.cnpj && `CNPJ: ${toCNPJMask(company.cnpj)}`}
        </CompanySubTitle>
      </WrapperCompany>
    );
    return (
      <WrapperOrder>
        <ContainerWrapper
          isInsideAnother
          extraComponent={
            <RowOrder>
              <CompanyDetails />
              <Account
                title="Seu saldo de créditos"
                companyId={company.id}
                redirectDisabled
              />
            </RowOrder>
          }
        >
          <Table companyId={company.id} />
        </ContainerWrapper>
      </WrapperOrder>
    );
  }
}

VirtualAccount.propTypes = {
  company: shape({}).isRequired,
};

const mapStateToProps = ({ selectedCompanyTree }) => ({
  company: selectedCompanyTree.selectedCompany,
});

export default connect(mapStateToProps)(VirtualAccount);
