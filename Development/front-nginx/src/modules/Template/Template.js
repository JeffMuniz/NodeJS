import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../common/Navbar/Navbar";
import Container from "../../common/Container/Container";
import { View, Nav, FooterDiv, Line, ChildContainer } from "./Template.styles";
import Footer from "../../common/Footer/Footer";

const Template = ({ children }) => (
  <View>
    <Nav>
      <Container>
        <Navbar />
      </Container>
    </Nav>
    <ChildContainer>{children}</ChildContainer>
    <FooterDiv>
      <Line />
      <Container>
        <Footer />
      </Container>
    </FooterDiv>
  </View>
);

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
