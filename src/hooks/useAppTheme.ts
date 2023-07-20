import { useTheme } from 'react-native-paper';
import lightTheme from '../themes/lightTheme';

export const theme = {
  ...lightTheme,
  roundness: 4,
};
export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
