import {View} from 'react-native';
import React from 'react';
import {MainCategoryDTO} from 'src/redux/reducers/product';
import useTheme from '_hooks/useTheme';
import {width} from '_theme/Layout';
import Text from '_atom/Text';
import {Button} from '_atom/Button';

const CategoryWrapper = ({category}: {category: MainCategoryDTO}) => {
  const {Gutters, Colors, Layout} = useTheme();

  return (
    <View>
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Layout.alignItemsCenter,
          Gutters.smallPadding,
          {
            backgroundColor: Colors.white,
            borderTopLeftRadius: width * 0.03,
            borderTopRightRadius: width * 0.03,
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.neutral[500],
          },
        ]}>
        <Text
          text={category?.name}
          variant="bold"
          size="lg"
          style={{flex: 7}}
        />
        <Button
          icon="plus"
          title="New Item"
          style={[Gutters.smallHPadding, {padding: 0}]}
          titleSize={'sm'}
          buttonBodyStyle={Gutters.smallRPadding}
        />
      </View>
    </View>
  );
};

export default CategoryWrapper;
