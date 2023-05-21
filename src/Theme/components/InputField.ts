import {CommonParams} from '_theme/theme';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

export default function <C>({
  Colors,
  Gutters,
  Layout,
  Fonts,
  MetricsSizes,
}: CommonParams<C>) {
  const wrapper: StyleProp<TextStyle> = {
    ...Gutters.tinyHPadding,
    ...Fonts.normal,
    flex: 8,
  };

  return StyleSheet.create({
    label: {
      ...Gutters.tinyBMargin,
    },
    focusedInput: {
      borderColor: Colors.primary[500],
      backgroundColor: Colors.neutral[200],
    },
    errorLabel: {
      ...Gutters.tinyVMargin,
      color: Colors.danger[700],
    },
    errorInput: {
      borderColor: Colors.danger[700],
    },
    inputContainer: {
      ...Gutters.smallHPadding,
    },
    borderedInput: {
      ...wrapper,
      borderWidth: 1,
      borderColor: Colors.neutral[400],
      borderTopLeftRadius: MetricsSizes?.regular,
      borderTopRightRadius: MetricsSizes?.regular,
      borderRadius: MetricsSizes?.regular,
      backgroundColor: '#fff',
    },
    borderBottomOnlyInput: {
      ...wrapper,
      borderBottomWidth: 1,
    },
    iconBox: {
      ...Layout.fill,
      ...Layout.center,
    },
  });
}
