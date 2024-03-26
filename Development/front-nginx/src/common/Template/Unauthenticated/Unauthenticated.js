import React, { PureComponent } from "react";
import { node, bool, string, func, shape } from "prop-types";
import { Col } from "react-flexbox-grid";

import { SvgIcon } from "@common";
import { IconHeart } from "@assets";
import { If } from "@utils";

import Animation from "src/modules/Animation/Animation";
import * as animationData from "src/base/WithPagination/animation.json";
import { getEcUrl, getmacPortal } from "src/modules/UrlManager/UrlManager";
import ScrollToTop from "src/common/Template/ScrollToTop/ScrollToTop";

import Footer from "./Footer";
import Header from "./Header";
import Box from "./Box";
import {
  Container,
  macHeart,
  Boxes,
  ChildrenWrapper,
  ImageWrapper,
  Link,
  Loading,
  RedText,
  StyledLeftCol,
  StyledRightCol,
  StyledRightColContent,
  AnimationWrapper,
  EmptyBox,
} from "./Unauthenticated.styles";

class Unauthenticated extends PureComponent {
  componentDidUpdate = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      Animation.loadAnimation({
        container: this.animationRef,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    }
  };

  gomacPortal = () => {
    window.location.replace(getmacPortal());
  };

  render() {
    const {
      children,
      showBoxes,
      isLoading,
      id,
      goBack,
      title,
      subtitle,
      text,
      width,
    } = this.props;
    const termPrivacy = id === "context-term-privacy";
    const updateUser = id === "context-update-user";

    if (termPrivacy) {
      return (
        <ScrollToTop>
          <Container>
            <StyledLeftCol>
              <div>
                <macHeart>
                  <a
                    key="icon-logo"
                    id="btn-icon-logo"
                    rel="noopener noreferrer"
                    href={getmacPortal()}
                  >
                    <SvgIcon icon={IconHeart} />
                  </a>
                </macHeart>
              </div>
              <div>
                <ImageWrapper />
              </div>
            </StyledLeftCol>
            <StyledRightCol padding={20} size={740}>
              <StyledRightColContent xs={12} lg={10} id={id}>
                <Header
                  id={id}
                  title={title}
                  subtitle={subtitle}
                  text={text}
                  goBack={goBack}
                />
                <ChildrenWrapper center="xs">
                  <Col>{children}</Col>
                </ChildrenWrapper>
                <Footer />
              </StyledRightColContent>
            </StyledRightCol>
          </Container>
        </ScrollToTop>
      );
    }

    if (updateUser) {
      return (
        <ScrollToTop>
          <Container>
            <StyledLeftCol>
              <div>
                <macHeart>
                  <a
                    key="icon-logo"
                    id="btn-icon-logo"
                    rel="noopener noreferrer"
                    href={getmacPortal()}
                  >
                    <SvgIcon icon={IconHeart} />
                  </a>
                </macHeart>
              </div>
              <div>
                <ImageWrapper />
              </div>
            </StyledLeftCol>
            <StyledRightCol>
              <StyledRightColContent id={id}>
                <Header id={id} title={title} subtitle={subtitle} text={text} />
                <ChildrenWrapper center="xs">
                  <Col>{children}</Col>
                </ChildrenWrapper>
                <If test={!showBoxes}>
                  <EmptyBox />
                </If>
                <Footer />
              </StyledRightColContent>
            </StyledRightCol>
          </Container>
        </ScrollToTop>
      );
    }
    return (
      <ScrollToTop>
        <Container>
          <AnimationWrapper isLoading={isLoading}>
            <If test={isLoading}>
              <Loading
                id="animation"
                innerRef={ref => {
                  this.animationRef = ref;
                }}
              />
            </If>
          </AnimationWrapper>
          <StyledLeftCol>
            <div>
              <macHeart>
                <a
                  key="icon-logo"
                  id="btn-icon-logo"
                  rel="noopener noreferrer"
                  href={getmacPortal()}
                >
                  <SvgIcon icon={IconHeart} />
                </a>
              </macHeart>
            </div>
            <div>
              <ImageWrapper />
            </div>
          </StyledLeftCol>

          <StyledRightCol>
            <StyledRightColContent xs={12} lg={10} id={id}>
              <Header
                title={title}
                subtitle={subtitle}
                text={text}
                goBack={goBack}
              />
              <ChildrenWrapper center="xs" width={width}>
                <Col xs={8} lg={6}>
                  {children}
                </Col>
              </ChildrenWrapper>

              <If test={showBoxes}>
                <Boxes>
                  <Box title="Você aceita" align="right">
                    <Link
                      id="link_portal_ec"
                      href={getEcUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      acesse
                    </Link>{" "}
                    a área para se cadastrar o seu estabelecimento.
                  </Box>
                  <Box title="Você utiliza" align="left" showStores>
                    <span>
                      <RedText>baixe</RedText> nosso app em seu smartphone e
                      administre seus macefícios do seu jeito.
                    </span>
                  </Box>
                </Boxes>
              </If>
              <If test={!showBoxes}>
                <EmptyBox />
              </If>
              <Footer />
            </StyledRightColContent>
          </StyledRightCol>
        </Container>
      </ScrollToTop>
    );
  }
}

Unauthenticated.propTypes = {
  children: node.isRequired,
  isLoading: bool.isRequired,
  id: string.isRequired,
  goBack: func.isRequired,
  showBoxes: bool,
  title: string.isRequired,
  subtitle: string.isRequired,
  text: shape().isRequired,
  width: string,
};

Unauthenticated.defaultProps = {
  showBoxes: true,
  width: null,
};

export default Unauthenticated;
