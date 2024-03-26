import React, { Fragment } from "react";
import { func, arrayOf, shape, number } from "prop-types";
import Voucher from "./Voucher.container";
import { Arrow, Item, VoucherList } from "./Voucher.styles";

const VOUCHER_WIDTH = 567;

class VoucherListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      position: 0,
    };
  }

  moveLeft = () => () => {
    const { active } = this.state;
    const newActive = active - 1;

    if (newActive >= 0) {
      this.setState({
        position: newActive * VOUCHER_WIDTH * -1,
        active: newActive,
      });
    }
  };

  moveRight = () => () => {
    const { active } = this.state;
    const { items } = this.props;
    const newActive = active + 1;

    if (newActive >= items.length - 1) {
      return;
    }

    this.setState({
      active: newActive,
      position: newActive * VOUCHER_WIDTH * -1,
    });
  };

  render() {
    const { updateVouchers, changeVoucherStatus, items } = this.props;
    const { active, position } = this.state;
    const MAX_VOUCHERS = items.length - 2;
    const showLeftArrow = active > 0;
    const showRightArrow = active !== MAX_VOUCHERS;

    return (
      <Fragment>
        <Arrow
          orientation="left"
          left
          id="left-arrow-button"
          show_arrow={showLeftArrow.toString()}
          onClick={this.moveLeft()}
        >
          {"<"}
        </Arrow>
        <VoucherList position={position}>
          {items.map((item, index) => (
            <Item key={item.id}>
              <Voucher
                {...item}
                index={index}
                updateVouchers={updateVouchers}
                changeVoucherStatus={changeVoucherStatus}
              />
            </Item>
          ))}
        </VoucherList>
        <Arrow
          orientation="right"
          right
          show_arrow={showRightArrow.toString()}
          id="right-arrow-button"
          onClick={this.moveRight()}
        >
          {">"}
        </Arrow>
      </Fragment>
    );
  }
}

VoucherListComponent.propTypes = {
  items: arrayOf(shape()),
  active: number,
  updateVouchers: func.isRequired,
  changeVoucherStatus: func.isRequired,
};

VoucherListComponent.defaultProps = {
  items: [],
  active: 0,
};

export default VoucherListComponent;
