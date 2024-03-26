import React, { Component } from "react";
import PropTypes from "prop-types";

import { blue } from "@colors";
import { ClickOutsideListener, DropdownFiles } from "@common";
import { If } from "@utils";

import { Button, ContainerButton } from "./styles";

export class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDocsOptions: false,
    };

    this.triggerRef = React.createRef();
  }

  handleChangeDropdownVisibility = () => {
    this.setState(({ showDocsOptions }) => ({
      showDocsOptions: !showDocsOptions,
    }));
  };

  render() {
    const { invoice } = this.props;
    const { showDocsOptions } = this.state;

    return (
      <ContainerButton>
        <ClickOutsideListener
          id="details_header_click_outside_id_dropdown"
          handleClickOutside={this.handleChangeDropdownVisibility}
          isListening={showDocsOptions}
          triggerRef={this.triggerRef}
        >
          <Button
            id="show_docs_"
            imgSrc="arrowDown"
            imgColor={blue}
            imgWidth={20}
            buttonType="link"
            value="Ver documentos financeiros"
            onClick={this.handleChangeDropdownVisibility}
          />
          <If test={showDocsOptions}>
            <DropdownFiles
              invoice={invoice}
              handleChangeDropdownVisibility={
                this.handleChangeDropdownVisibility
              }
            />
          </If>
        </ClickOutsideListener>
      </ContainerButton>
    );
  }
}

Documents.propTypes = {
  invoice: PropTypes.shape({
    allowRpsDownload: PropTypes.bool,
    invoiceStatus: PropTypes.string,
    invoiceDate: PropTypes.string,
    paymentType: PropTypes.string,
    receivableId: PropTypes.number,
    invoiceId: PropTypes.number,
  }).isRequired,
};

export default Documents;
