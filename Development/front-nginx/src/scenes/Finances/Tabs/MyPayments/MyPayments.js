import React from "react";
import { arrayOf, bool, func, string, shape, number, node } from "prop-types";

import { Pagination, SearchableInput, Loading } from "@base";
import { blue } from "@colors";
import {
  SvgIcon,
  DropdownFiles,
  PeriodDropDown,
  ClickOutsideListener,
} from "@common";
import { If } from "@utils";

import {
  Container,
  ContainerFilter,
  Table,
  InvoiceRow,
  Cell,
  CellWithBorder,
  Field,
  Label,
  Value,
  ItemLink,
  LoadingWrapper,
  PeriodLabel,
  SelectWrapper,
} from "./MyPayments.styles";

const MyPayments = ({
  invoices,
  isLoading,
  itemsPerPage,
  onChangePage,
  page,
  EmptyComponent,
  filterBy,
  fieldsToFilterBy,
  fieldsToFilterByDate,
  handleInputFilterValueChange,
  handleSelectedInputFilterChange,
  handlePeriodChange,
  handleChangeDropdownVisibility,
  getStatusDescription,
  getPaymentDescription,
  triggerRef,
}) => (
  <Container itens={invoices.totalItems}>
    <ContainerFilter>
      <SelectWrapper>
        <PeriodLabel>Vencimento: </PeriodLabel>
        <PeriodDropDown
          id="my_payments_period_date_select"
          valueList={Object.values(fieldsToFilterByDate)}
          onSelectValue={handlePeriodChange}
          maxRange={{ period: "months", value: 1 }}
          canEditPeriod
          padding="0px 21px"
          position={false}
          editDateText="Escolher data"
        />
      </SelectWrapper>
      <SearchableInput
        id="searchable_input_id"
        fieldsToFilterBy={fieldsToFilterBy}
        onChange={handleInputFilterValueChange}
        onFilterChange={handleSelectedInputFilterChange}
        filterBy={filterBy}
      />
    </ContainerFilter>
    <If test={isLoading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!isLoading}>
      <Pagination
        data={{
          totalItems: invoices.totalItems,
        }}
        currentPage={page}
        itemsPerPage={itemsPerPage}
        callback={onChangePage}
        emptyStateComponent={EmptyComponent}
        showLoading
        render={() => (
          <Table>
            {invoices &&
              invoices.content &&
              invoices.content.map((invoice, index) => (
                <InvoiceRow
                  key={invoice.receivableId}
                  id={`invoice_list_row_${index}`}
                >
                  <Cell withRadiusLeft>
                    <CellWithBorder>
                      <Field isFlex>
                        <Label id={`invoice_title_order_id_${index}`}>
                          ID do Pedido
                        </Label>
                        <Value>{invoice.orderId}</Value>
                      </Field>
                      <Field isFlex>
                        <Label id={`invoice_title_payment_type_${index}`}>
                          Forma de pagto.
                        </Label>
                        <Value>
                          {getPaymentDescription(invoice.paymentType)}
                        </Value>
                      </Field>
                    </CellWithBorder>
                  </Cell>

                  <Cell>
                    <CellWithBorder>
                      <Field isFlex>
                        <Label id={`invoice_title_cnpj_${index}`}>CNPJ</Label>
                        <Value>{invoice.cnpj}</Value>
                      </Field>
                      <Field isFlex>
                        <Label>Status</Label>
                        <Value>{getStatusDescription(invoice)}</Value>
                      </Field>
                    </CellWithBorder>
                  </Cell>

                  <Cell>
                    <CellWithBorder>
                      <Field isFlex>
                        <Label id={`invoice_title_amount_${index}`}>
                          Valor total
                        </Label>
                        <Value>{invoice.amount}</Value>
                      </Field>
                      <Field isFlex>
                        <Label>Centro de custo</Label>
                        <Value>{invoice.costCenter}</Value>
                      </Field>
                    </CellWithBorder>
                  </Cell>

                  <Cell>
                    <Field>
                      <Label id={`invoice_title_credit_date_${index}`}>
                        Data do Vencimento
                      </Label>
                      <Value>{invoice.dueDate}</Value>
                    </Field>
                  </Cell>

                  <Cell withRadiusRight style={{ paddingTop: "20px" }}>
                    <If test={invoice.showDocuments}>
                      <ClickOutsideListener
                        id="ud_dropdown"
                        handleClickOutside={handleChangeDropdownVisibility}
                        isListening={invoice.openOptions}
                        triggerRef={triggerRef}
                        style={{ float: "right" }}
                      >
                        <ItemLink
                          id={`invoice_content_documents_button_${index}`}
                          onClick={() => {
                            handleChangeDropdownVisibility(invoice);
                          }}
                        >
                          Documentos
                          <SvgIcon name="arrowDown" fill={blue} />
                        </ItemLink>
                        <If test={invoice.openOptions}>
                          <DropdownFiles
                            invoice={invoice}
                            handleChangeDropdownVisibility={
                              handleChangeDropdownVisibility
                            }
                          />
                        </If>
                      </ClickOutsideListener>
                    </If>
                  </Cell>
                </InvoiceRow>
              ))}
          </Table>
        )}
      />
    </If>
  </Container>
);

MyPayments.propTypes = {
  invoices: shape({
    totalItems: number,
    invoices: arrayOf(
      shape({
        receivableId: number,
        orderId: number,
        cnpj: string,
        amount: number,
        dueDate: string,
        paymentType: string,
        receivableStatus: string,
        invoiceDate: string,
        showDocuments: bool,
        costCenter: string,
      }),
    ),
  }),
  isLoading: bool,
  itemsPerPage: number,
  onChangePage: func.isRequired,
  page: number,
  EmptyComponent: node.isRequired,
  filterBy: shape({}).isRequired,
  fieldsToFilterBy: arrayOf(shape({})).isRequired,
  fieldsToFilterByDate: shape({}).isRequired,
  handleInputFilterValueChange: func.isRequired,
  handleSelectedInputFilterChange: func.isRequired,
  handlePeriodChange: func.isRequired,
  handleChangeDropdownVisibility: func.isRequired,
  getStatusDescription: func.isRequired,
  getPaymentDescription: func.isRequired,
  triggerRef: shape({}).isRequired,
};

MyPayments.defaultProps = {
  itemsPerPage: 20,
  isLoading: false,
  invoices: {},
  page: 1,
};

export default MyPayments;
