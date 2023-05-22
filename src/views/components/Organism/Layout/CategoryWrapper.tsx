import {Pressable, View} from 'react-native';
import React from 'react';
import {MainCategoryDTO} from 'src/redux/reducers/product';
import useTheme from '_hooks/useTheme';
import {width} from '_theme/Layout';
import Text from '_atom/Text';
import {Button} from '_atom/Button';
import NavigationService from 'src/navigators/NavigationService';
import {InputField} from '_molecule/Input';
import Icon from '_atom/Icon';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/redux';
import {deleteCategoryItem} from '_actions/product';

const RenderEmptyItem = () => {
  const {Gutters, Colors, Layout} = useTheme();

  return (
    <View style={[Layout.center, Gutters.largePadding]}>
      <Text text="No Item to displays" />
    </View>
  );
};

const CategoryWrapper = ({
  category,
  ...props
}: {category: MainCategoryDTO} & ReduxProps) => {
  const {_deleteCategoryItem} = props;
  const {Gutters, Colors, Layout} = useTheme();

  React.useEffect(() => {
    console.log('category', category);
  }, [category]);

  const removeItem = React.useCallback(item => {
    console.log('item', item);
    _deleteCategoryItem(category?.id, item?.id);
  }, []);

  return (
    <View style={Gutters.smallBMargin}>
      <Pressable
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
        ]}
        onPress={() => NavigationService.navigate('EditPage', {category})}>
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
          onPress={onAddNewItem}
        />
      </Pressable>
      <View
        style={{
          borderBottomLeftRadius: width * 0.03,
          borderBottomRightRadius: width * 0.03,
          backgroundColor: Colors.white,
        }}>
        {category?.items?.length ? (
          category?.items?.map(i => {
            console.log('i', i);
            return (
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Gutters.smallPadding,
                  {
                    alignItems: 'center',
                    borderBottomColor: Colors.neutral[300],
                    borderBottomWidth: 0.5,
                  },
                ]}>
                <InputField
                  label="Category Name"
                  value={'categoryName'}
                  inputFieldStyle={{flex: 8}}
                  // onChangeText={val => {
                  //   setCategoryName(val);
                  //   setInvalidCatName(false);
                  // }}
                />
                <Pressable
                  onPress={() => removeItem(i)}
                  style={[Layout.center, {flex: 1}]}>
                  <Icon name="trash-can" color={Colors.danger[500]} />
                </Pressable>
              </View>
            );
            // for (const [key, value] of Object.entries(i)) {
            //   console.log(`key ${key}: ${value}`);
            //   return (
            //     <View
            //       style={[
            //         Gutters.smallPadding,
            //         {
            //           borderBottomColor: Colors.neutral[300],
            //           borderBottomWidth: 0.5,
            //         },
            //       ]}>
            //       <Text text={value} />
            //     </View>
            //   );
            // }
          })
        ) : (
          <RenderEmptyItem />
        )}
      </View>
    </View>
  );

  function onAddNewItem() {
    NavigationService.navigate('CreateItemCategory', {
      categoryConfig: category,
    });
  }
};

const mapStateToProps = ({product}: RootState) => ({
  mainCategories: product.mainCategories,
});

const mapDispatchToProps = {
  _deleteCategoryItem: deleteCategoryItem,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(CategoryWrapper);
