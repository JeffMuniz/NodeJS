import React, { Fragment } from "react";
import { string, node, bool } from "prop-types";

import {
  getmacAppAndroid,
  getmacAppIos,
} from "src/modules/UrlManager/UrlManager";

import { If } from "@utils";
import { GooglePlay, AppStore } from "@assets";

import { Container, Title, Subtitle, Paragraph } from "./Box.style";
import SvgIcon from "../../SvgIcon/SvgIcon";

const Box = ({ title, children, align, showStores }) => (
  <Container align={align} xs={6}>
    <Title>{title}</Title>
    <Subtitle>
      <b>mac</b> Visa Card?
    </Subtitle>
    <Paragraph>{children}</Paragraph>
    <If test={showStores}>
      <Fragment>
        <a
          id="link_google_play"
          href={getmacAppAndroid()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SvgIcon icon={GooglePlay} />
        </a>
        <a
          id="link_app_store"
          href={getmacAppIos()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SvgIcon icon={AppStore} />
        </a>
      </Fragment>
    </If>
  </Container>
);

Box.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  showStores: bool,
  align: string,
};

Box.defaultProps = {
  align: "left",
  showStores: false,
};

export default Box;
