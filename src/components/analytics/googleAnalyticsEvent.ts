import ReactGA from "react-ga4";

const googleAnalyticsEvent = (
  category: string,
  action: string,
  label: string,
) => {
  if (
    import.meta.env.MODE === "production" &&
    import.meta.env.VITE_GOOGLE_ANALYTICS_GA4_ID
  ) {
    // See: https://developers.google.com/analytics/devguides/collection/gtagjs/events
    // See: https://www.npmjs.com/package/react-ga4
    // ReactGA.send({hitType: "event", category: category, label: label, action: action});
    ReactGA.event(action, {
      category,
      label,
    });
  }
};

export default googleAnalyticsEvent;
