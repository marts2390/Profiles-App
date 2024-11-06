import { getSpacing } from '@src/theme/utils/spacing';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: getSpacing(5, 'width'),
    paddingVertical:
      Platform.OS === 'android' ? getSpacing(5, 'height') : undefined,
    justifyContent: 'space-between',
  },
  flexGrow: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: getSpacing(4, 'height'),
  },
  slider: {
    width: '100%',
  },
});
