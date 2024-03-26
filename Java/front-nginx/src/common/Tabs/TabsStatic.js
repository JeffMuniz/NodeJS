import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Container, TabItem, Line } from "./Tabs.styles";

const TabsStatic = ({ tabs, onClickTabItem, activeTab, marginLess }) => (
  <Fragment>
    <Container marginLess={marginLess}>
      {tabs.map((tab, index) => (
        <TabItem
          key={index}
          selected={tab === activeTab}
          onClick={event => onClickTabItem(tab, event)}
        >
          {tab}
        </TabItem>
      ))}
      <Line />
    </Container>
  </Fragment>
);

TabsStatic.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTabItem: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  marginLess: PropTypes.bool,
};

TabsStatic.defaultProps = {
  marginLess: false,
};

export default TabsStatic;
