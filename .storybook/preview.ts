import type { Preview } from "@storybook/react"
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

export const decorators = [
  withThemeFromJSXProvider({
  defaultTheme: 'light',
  themes: {
    light: createTheme(),
  },
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
})];


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      extended: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
