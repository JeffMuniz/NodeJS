import React, { Component } from "react";
import { string, oneOfType, number, bool } from "prop-types";
import {
  dustyGray,
  redFlagGetnet,
  darkGreen,
  chartOrange,
  chartGrey,
} from "@colors";
import { If, toMoneyMask } from "@utils";

import {
  Container,
  ChartWrapper,
  ChartTransform,
  Chart,
  Percentage,
  BottomLabel,
  DescriptionWrapper,
  Title,
  AvailableValue,
  Description,
  UsedLimit,
  TotalLimit,
  MailTo,
} from "./LimitChart.styles";

class LimitChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.getColor(props.percentage),
      background: this.getBackground(props.percentage),
      statePercentage: props.percentage,
    };
  }

  componentDidUpdate() {
    const { percentage } = this.props;
    const { statePercentage } = this.state;
    if (percentage === statePercentage) return;
    this.setStateColor(percentage);
  }

  setStateColor = percentage => {
    this.setState({
      color: this.getColor(percentage),
      background: this.getBackground(percentage),
      statePercentage: percentage,
    });
  };

  getColor = percentage => {
    const colors = {
      "0": darkGreen,
      "25": dustyGray,
      "50": chartOrange,
      "75": redFlagGetnet,
      "100": redFlagGetnet,
    };

    const color = Object.keys(colors)
      .filter(x => Number(x) <= Number(percentage))
      .pop();

    return colors[color];
  };

  getBackground = percentage =>
    Number(percentage) >= 50 ? chartGrey : darkGreen;

  render() {
    const { color, background } = this.state;
    const {
      percentage,
      availableValue,
      usedLimit,
      totalLimit,
      hasBorderTop,
    } = this.props;

    const contactEmail = "contasareceber@macvisacard.com.br";
    const totalLimitUsed = percentage >= 100;

    return (
      <Container
        id="lmc_container"
        hasBorderTop={hasBorderTop}
        aria-percentage={percentage}
        aria-used-color={color}
        aria-left-color={background}
      >
        <ChartWrapper>
          <ChartTransform>
            <Chart
              data={[{ value: 1, key: 1, color }]}
              reveal={percentage > 100 ? 100 : percentage}
              lineWidth={25}
              percentage={percentage}
              lengthAngle={270}
              rounded
              background={background}
            />
          </ChartTransform>
          <Percentage id="lmc_percent">{percentage}%</Percentage>
          <BottomLabel>Utilizado</BottomLabel>
        </ChartWrapper>
        <DescriptionWrapper>
          <Title id="lmc_your_limit">
            seu limite disponível para pedidos é:
          </Title>
          <If test={availableValue <= 0}>
            <AvailableValue id="lmc_available_value">
              {toMoneyMask(0)}
            </AvailableValue>
          </If>
          <If test={availableValue > 0}>
            <AvailableValue id="lmc_available_value">
              {toMoneyMask(availableValue)}
            </AvailableValue>
          </If>
          <If test={!totalLimitUsed}>
            <Description id="lmc_desc">
              Você está utilizando
              <UsedLimit id="lmc_used_value">
                {` ${toMoneyMask(usedLimit)} `}
              </UsedLimit>
              do seu limite total de
              <TotalLimit id="lmc_total_value">
                {` ${toMoneyMask(totalLimit)} `}
              </TotalLimit>
            </Description>
          </If>
          <If test={totalLimitUsed}>
            <Description id="lmc_desc_mailto">
              entre em contato com
              <MailTo href={`mailto:${contactEmail}`}>
                &nbsp;{contactEmail}
              </MailTo>
            </Description>
          </If>
        </DescriptionWrapper>
      </Container>
    );
  }
}

LimitChart.propTypes = {
  percentage: oneOfType([string, number]).isRequired,
  availableValue: number.isRequired,
  usedLimit: number.isRequired,
  totalLimit: number.isRequired,
  hasBorderTop: bool.isRequired,
};

export default LimitChart;
