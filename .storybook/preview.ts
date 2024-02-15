import type { Preview } from "@storybook/web-components";

import '../src/assets/themes/light.css';
import '../src/assets/themes/dark.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
