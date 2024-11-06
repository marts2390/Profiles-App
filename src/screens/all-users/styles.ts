import { getSpacing } from '@src/theme/utils/spacing';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const useStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    content: {
      paddingHorizontal: getSpacing(5, 'width'),
      paddingTop: insets.top + getSpacing(5, 'width'),
      paddingBottom: insets.bottom + getSpacing(5, 'width'),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyList: {
      marginTop: getSpacing(30, 'height'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      marginBottom: getSpacing(5, 'height'),
    },
    listItem: {
      marginBottom: getSpacing(3, 'height'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
