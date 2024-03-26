import React from "react";
import lottie from "lottie-web";
import { bool } from "prop-types";

import * as animationData from "src/base/WithPagination/animation.json";
import { Loading as LoadingIcon } from "./ContainerWrapper.styles";

class Loading extends React.PureComponent {
  componentDidMount() {
    lottie.loadAnimation({
      container: this.animationRef,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });
  }

  render() {
    const { loading } = this.props;
    return !loading ? null : (
      <LoadingIcon
        id="animation"
        key={this.animationRef}
        innerRef={ref => {
          this.animationRef = ref;
        }}
      />
    );
  }
}

Loading.propTypes = {
  loading: bool,
};

Loading.defaultProps = {
  loading: false,
};

export default Loading;
