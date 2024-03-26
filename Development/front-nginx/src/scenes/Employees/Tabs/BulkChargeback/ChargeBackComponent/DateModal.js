import React from "react";
import { func, shape, oneOf, number, bool } from "prop-types";

import { Button } from "@common";
import { buttonTypes as buttonTypesEnum } from "@enums";
import moment from "src/modules/DateManager/DateManager";
import ReportDatePicker from "@common/ReportDatePicker/ReportDatePicker";
import { Wrapper, ButtonsWrapper } from "./styles";

const CreateReport = ({
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
    <ReportDatePicker
      id="chargeback_date"
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
        value="Voltar"
        buttonType={buttonTypesEnum.light}
      />
      <Button
        id="button_create_report_submit"
        onPress={onSubmit}
        value="Continuar"
        buttonType={buttonTypesEnum.primary}
        loading={isLoading}
        disabled={!startDate}
      />
    </ButtonsWrapper>
  </Wrapper>
);

CreateReport.propTypes = {
  isLoading: bool.isRequired,
  onSubmit: func.isRequired,
  onCloseModal: func.isRequired,
  onDateChange: func.isRequired,
  selectedStartDate: func.isRequired,
  selectedEndDate: func.isRequired,
  startDate: func.isRequired,
  maxRange: shape({
    period: oneOf(["years", "months", "days"]),
    value: number,
  }).isRequired,
};

export default CreateReport;
