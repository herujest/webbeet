import {Button} from '_atom/Button';
import Text from '_atom/Text';
import useTheme from '_hooks/useTheme';
import {height, width} from '_theme/Layout';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import NavigationService from 'src/navigators/NavigationService';

const EmptyCategory = () => {
  const {Images, Layout, Gutters} = useTheme();

  const onCreateNew = React.useCallback(() => {
    NavigationService.navigate('CreatePage');
  }, []);

  return (
    <View style={[Layout.fill, Layout.center, {height: height * 0.8}]}>
      <Image source={Images.emptyData} style={styles.image} />
      <Text
        text="You don't have any listed category to show"
        variant="light"
        size={'lg'}
        style={[Gutters.smallTMargin, styles.description]}
      />
      <Button title="Create New Category" onPress={onCreateNew} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width * 0.5,
    height: width * 0.5,
    aspectRatio: 1,
  },
  description: {
    textAlign: 'center',
  },
});

export default EmptyCategory;
