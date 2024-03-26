import React from "react";
import moment from "moment";
import { func, shape, oneOf, number, bool, string } from "prop-types";

import { Button } from "@common";
import buttonTypesEnum from "src/enums/buttonTypes.enum";
import ReportDatePicker from "@common/ReportDatePicker/ReportDatePicker";
import { Wrapper, Title, ButtonsWrapper } from "./CreateReport.styles";

const CreateReport = ({
  title,
  cancelButtonText,
  sumbitButtonText,
  onDateChange,
  selectedStartDate,
  selectedEndDate,
  startDate,
  maxRange,
  onSubmit,
  onCloseModal,
  isLoading,
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <ReportDatePicker
      id="report_date"
      onDatesChange={onDateChange}
      initialStartDate={selectedStartDate}
      initialEndDate={selectedEndDate}
      maxRange={maxRange}
      maxDate={moment()}
    />
    <ButtonsWrapper>
      <Button
        id="button_create_report_cancel"
        onPress={onCloseModal}
        value={cancelButtonText}
        buttonType={buttonTypesEnum.light}
      />
      <Button
        id="button_create_report_submit"
        onPress={onSubmit}
        value={sumbitButtonText}
        buttonType={buttonTypesEnum.primary}
        loading={isLoading}
        disabled={!startDate}
      />
    </ButtonsWrapper>
  </Wrapper>
);

CreateReport.propTypes = {
  title: string,
  cancelButtonText: string,
  sumbitButtonText: string,
  isLoading: bool.isRequired,
  onSubmit: func.isRequired,
  onCloseModal: func.isRequired,
  onDateChange: func.isRequired,
  selectedStartDate: string,
  selectedEndDate: string,
  startDate: shape({}),
  maxRange: shape({
    period: oneOf(["years", "months", "days"]),
    value: number,
  }).isRequired,
};

CreateReport.defaultProps = {
  title: "Novo Relatório",
  cancelButtonText: "Cancelar",
  sumbitButtonText: "Gerar",
  selectedStartDate: "",
  selectedEndDate: "",
  startDate: null,
};
export default CreateReport;
