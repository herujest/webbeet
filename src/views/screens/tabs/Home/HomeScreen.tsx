import {setCategory} from '_actions/product';
import useTheme from '_hooks/useTheme';
import {HeaderTitle} from '_molecule/Header';
import {Container} from '_organism/Basic';
import CategoryWrapper from '_organism/Layout/CategoryWrapper';
import React from 'react';
import {FlatList} from 'react-native';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/redux';
import {MainCategoryDTO} from 'src/redux/reducers/product';
import {HomeScreenProps} from 'src/utils/types';
import EmptyCategory from '../ManageCategory/EmptyCategory';

type Props = ReduxProps & HomeScreenProps;

const HomeScreen = (props: Props) => {
  const {mainCategories} = props;
  const {Gutters} = useTheme();

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
        ListEmptyComponent={EmptyCategory}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

const mapStateToProps = ({product}: RootState) => ({
  mainCategories: product.mainCategories,
});

const mapDispatchToProps = {
  _setCategory: setCategory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(HomeScreen);
