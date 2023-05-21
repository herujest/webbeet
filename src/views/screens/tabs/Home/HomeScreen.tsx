import {Button} from '_atom/Button';
import useTheme from '_hooks/useTheme';
import {HeaderTitle} from '_molecule/Header';
import {Container} from '_organism/Basic';
import CategoryWrapper from '_organism/Layout/CategoryWrapper';
import {width} from '_theme/Layout';
import React from 'react';
import {FlatList, View} from 'react-native';
import {ConnectedProps, connect} from 'react-redux';
import NavigationService from 'src/navigators/NavigationService';
import {RootState} from 'src/redux';
import {MainCategoryDTO} from 'src/redux/reducers/product';
import {HomeScreenProps} from 'src/utils/types';
import EmptyCategory from '../ManageCategory/EmptyCategory';

type Props = ReduxProps & HomeScreenProps;

const HomeScreen = (props: Props) => {
  const {mainCategories} = props;
  const {Gutters, Colors, Layout} = useTheme();

  return (
    <Container>
      <HeaderTitle
        leftIcon="menu"
        title={'Dashboard'}
        onPressLeftIcon={props.navigation.openDrawer}
      />
      <FlatList
        data={mainCategories}
        renderItem={({item, index}: {item: MainCategoryDTO; index: number}) => {
          return <CategoryWrapper key={index} category={item} />;
        }}
        contentContainerStyle={Gutters.smallPadding}
        ListEmptyComponent={EmptyCategory}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          mainCategories.length ? (
            <View style={[Layout.center]}>
              <View
                style={[
                  Gutters.largeTMargin,
                  {
                    width: width * 0.8,
                    height: 0.5,
                    backgroundColor: Colors.neutral[300],
                  },
                ]}
              />
              <Button
                title="Create New Category"
                onPress={() => NavigationService.navigate('CreatePage')}
                style={Gutters.largeVMargin}
              />
            </View>
          ) : null
        }
      />
    </Container>
  );
};

const mapStateToProps = ({product}: RootState) => ({
  mainCategories: product.mainCategories,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(HomeScreen);
