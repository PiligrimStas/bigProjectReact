import ThemeProvider from './ui/themeProvider';
import { useTheme } from './lib/useTheme'; // возможно этому хуку следовало находиться в слое shared
import { Theme } from './lib/themeContext';

export { ThemeProvider, useTheme, Theme };
