// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import "./style.css";

import { TryUseData } from "vitepress-usedata-repro-monorepo-components";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "layout-bottom": () => h(TryUseData),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};
