import {View, Text} from 'react-native';
import React from 'react';
import {MainCategoryDTO} from 'src/redux/reducers/product';

const CategoryWrapper = ({category}: {category: MainCategoryDTO}) => {
  console.log('category', category);

  return (
    <View>
      <Text>CategoryWrapper</Text>
    </View>
  );
};

export default CategoryWrapper;
