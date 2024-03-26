import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  arrayOf,
  oneOfType,
  shape,
  node,
  string,
  bool,
  func,
} from "prop-types";

import isEmpty from "lodash/isEmpty";

import { setSelectedTab as TabActions } from "src/redux/modules/tabs/actions/tabs";

import { Container, TabItem, Line } from "./Tabs.styles";

export class Tabs extends Component {
  constructor(props) {
    super(props);
    const { renderDynamically, children, setSelectedTab } = props;
    let activeTab = props.activeTab || undefined;

    if (isEmpty(activeTab)) {
      activeTab = renderDynamically
        ? children[Object.keys(children)[0]].props.label.description
        : children[0].props && children[0].props.label;
    }

    setSelectedTab(activeTab);

    this.state = {
      activeTab,
    };
  }

  onClickTabItem = (tabProps, blockOtherTabs) => () => {
    if (blockOtherTabs) return;

    const { onClick, renderDynamically, setSelectedTab } = this.props;
    const labelDescription = renderDynamically
      ? tabProps.label.description
      : tabProps.label;

    setSelectedTab(labelDescription);

    onClick(tabProps);

    this.setState({ activeTab: labelDescription });
  };

  render() {
    const {
      children,
      renderDynamically,
      blockOtherTabs,
      height,
      width,
    } = this.props;
    const { activeTab } = this.state;

    return (
      <Fragment>
        <Container>
          {renderDynamically
            ? React.Children.map(Object.keys(children), key => {
                const { props } = children[key];
                const {
                  label: { description },
                  id,
                } = props;
                return (
                  <TabItem
                    id={id}
                    activeTab={activeTab}
                    key={description}
                    label={description}
                    selected={activeTab === description}
                    onClick={this.onClickTabItem(props, blockOtherTabs)}
                    blockOtherTabs={blockOtherTabs}
                  >
                    {description}
                  </TabItem>
                );
              })
            : React.Children.map(children, child => {
                const {
                  props: { label, id },
                } = child;
                return (
                  <TabItem
                    id={id}
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    selected={activeTab === label}
                    onClick={this.onClickTabItem({ label })}
                    height={height}
                    width={width}
                  >
                    {label}
                  </TabItem>
                );
              })}
          <Line />
        </Container>
        {renderDynamically
          ? React.Children.map(Object.keys(children), key => {
              const {
                props: {
                  label: { description },
                },
              } = children[key];

              return description !== activeTab ? null : children[key];
            })
          : React.Children.map(
              children,
              ({ props: { label, children: child } }) =>
                label !== activeTab ? null : child,
            )}
      </Fragment>
    );
  }
}

Tabs.propTypes = {
  onClick: func,
  activeTab: string,
  children: oneOfType([shape({}), arrayOf(node)]).isRequired,
  renderDynamically: bool,
  blockOtherTabs: bool,
  height: string,
  width: string,
  setSelectedTab: func,
};

Tabs.defaultProps = {
  onClick: () => null,
  activeTab: "",
  renderDynamically: false,
  blockOtherTabs: false,
  height: "",
  width: "",
  setSelectedTab: () => null,
};

const mapDispatchToProps = {
  setSelectedTab: TabActions,
};

export default connect(null, mapDispatchToProps)(Tabs);
