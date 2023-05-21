import {MetricsSizes} from '_theme/Variables';
import {CommonParams} from '_theme/theme';
import {StyleSheet} from 'react-native';

export default function <C>({Colors, Gutters, Layout}: CommonParams<C>) {
  const base = {
    ...Gutters.tinyVMargin,
    ...Gutters.tinyHMargin,
    ...Layout.rowCenter,
    borderRadius: MetricsSizes.xlarge,
  };

  return StyleSheet.create({
    base,
    outline: {
      ...base,
      ...Layout.rowCenter,
      ...Gutters.tinyVPadding,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary[600],
    },
    icon: {
      ...Layout.center,
      ...Gutters.tinyHPadding,
      ...Gutters.tinyVPadding,
      ...Gutters.tinyHMargin,
      ...Gutters.tinyVMargin,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.neutral[500],
      flexGrow: 0,
    },
  });
}
