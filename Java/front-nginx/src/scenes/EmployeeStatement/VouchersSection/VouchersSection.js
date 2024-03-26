import React, { Fragment } from "react";
import { arrayOf, shape, func, string } from "prop-types";

import { Container, VouchersContainer } from "./VouchersSection.styles";
import VoucherList from "./Voucher/VoucherList";
import Voucher from "./Voucher/Voucher.container";
import EmptyVouchers from "./EmptyVouchers";

const VouchersSection = ({ vouchers, updateVouchers, changeVoucherStatus }) => {
  if (!vouchers || !vouchers.length) return <EmptyVouchers />;

  return (
    <Fragment>
      {vouchers.length < 3 ? (
        <Container>
          {vouchers.map((voucher, index) => (
            <Voucher
              key={`voucher_section_item${index}`}
              index={index}
              {...voucher}
              updateVouchers={updateVouchers}
              changeVoucherStatus={changeVoucherStatus}
            />
          ))}
        </Container>
      ) : (
        <VouchersContainer>
          <VoucherList
            items={vouchers}
            updateVouchers={updateVouchers}
            changeVoucherStatus={changeVoucherStatus}
            active={0}
          />
        </VouchersContainer>
      )}
    </Fragment>
  );
};

VouchersSection.propTypes = {
  vouchers: arrayOf(
    shape({
      id: string.isRequired,
      idProduct: string.isRequired,
      cardNumber: string.isRequired,
      issueDate: string.isRequired,
      printedName: string.isRequired,
    }),
  ).isRequired,
  updateVouchers: func.isRequired,
  changeVoucherStatus: func.isRequired,
};

export default VouchersSection;
