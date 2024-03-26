import React from "react";
import { node, shape, string, bool } from "prop-types";
import { withTheme, ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { isNil, get } from "lodash";

import { Container, Toast } from "@common";
import { If } from "@utils";
import { Modal, Warning } from "@base";

import ScrollToTop from "./ScrollToTop/ScrollToTop";
import SubGroupSelector from "./SubGroupSelector/SubGroupSelector.container";
import NavBar from "./NavBar/NavBar.container";
import Footer from "./Footer/Footer";
import { Bg, View, FooterDiv, Line } from "./Template.styles";

export const Template = ({
  children,
  theme,
  isAuthenticated,
  showModal,
  selectedGroup,
  match,
  location,
  history,
  shouldRenderWithoutGroupId,
}) => (
  <ThemeProvider theme={theme}>
    <View>
      <ScrollToTop>
        <Bg theme={theme}>
          <NavBar />

          <If test={isAuthenticated}>
            <SubGroupSelector />
          </If>

          <Warning />

          {(shouldRenderWithoutGroupId || !isNil(get(selectedGroup, "id"))) &&
            React.cloneElement(children, {
              match,
              location,
              history,
            })}

          <If test={!isAuthenticated}>
            <FooterDiv>
              <Line />
              <Container>
                <Footer />
              </Container>
            </FooterDiv>
          </If>

          <Toast />

          <If test={showModal}>
            <Modal />
          </If>
        </Bg>
      </ScrollToTop>
    </View>
  </ThemeProvider>
);

Template.propTypes = {
  children: node.isRequired,
  theme: shape({
    main: string,
  }),
  isAuthenticated: bool,
  showModal: bool,
  history: shape({}).isRequired,
  match: shape({}).isRequired,
  location: shape({}).isRequired,
  selectedGroup: shape({}).isRequired,
  shouldRenderWithoutGroupId: bool.isRequired,
};

Template.defaultProps = {
  theme: { main: "notLogged" },
  isAuthenticated: false,
  showModal: false,
};

const mapStateToProps = ({ selectedCompanyTree: { selectedGroup } }) => ({
  selectedGroup,
});

export default connect(mapStateToProps)(withTheme(Template));
