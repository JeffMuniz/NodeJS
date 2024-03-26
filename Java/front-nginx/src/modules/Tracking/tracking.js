import ReactGA from "react-ga";
import { getAnalytics } from "src/modules/UrlManager/UrlManager";
import { withRouter } from "react-router-dom";

export const trackEvent = (action, onPress, category) => e => {
  if (action) {
    ReactGA.event({
      category: category || "Button Click",
      action,
    });
  }
  return onPress(e);
};

export const WithTracker = withRouter(
  ({ location: { pathname }, children }) => {
    ReactGA.set({
      pathname,
    });
    ReactGA.pageview(pathname);
    return children;
  },
);

export const initializeGA = () => {
  const analytics =
    window.location.hostname !== "localhost" ? getAnalytics() : "0";

  ReactGA.initialize(analytics);
  ReactGA.pageview(window.location.pathname);
};
