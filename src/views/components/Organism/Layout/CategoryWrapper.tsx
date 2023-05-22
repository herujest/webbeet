import {FlatList, Pressable, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ItemPropDTO, MainCategoryDTO} from 'src/redux/reducers/product';
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
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

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

  const [inputData, setInputData] = React.useState<ItemPropDTO[]>([]);

  React.useEffect(() => {
    console.log('category', category);
  }, [category]);

  React.useEffect(() => {
    setInputData(category?.properties);
  }, [category]);

  const removeItem = item => {
    console.log('item', item);
    _deleteCategoryItem(category?.id, item?.id);
  };

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
        <KeyboardAwareFlatList
          data={category?.items}
          keyExtractor={(item, index) => index.toString()}
          extraData={[category, category?.items]}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  Layout.alignItemsStart,
                  Gutters.smallPadding,
                  {
                    borderBottomColor: Colors.neutral[300],
                    borderBottomWidth: 0.5,
                  },
                ]}>
                <View style={{flex: 8}}>
                  {inputData?.map((i: ItemPropDTO) => {
                    return (
                      <InputField
                        label={i?.value}
                        inputFieldStyle={Gutters.smallBMargin}
                        inputMode={i?.type}
                        // onChangeText={val => onChangeText(val, item)}
                        value={item[i?.value]}
                      />
                    );
                  })}
                </View>
                <TouchableOpacity
                  onPress={() => removeItem(item)}
                  style={[Layout.center, Gutters.xlargeTMargin, {flex: 1}]}>
                  <Icon name="trash-can" color={Colors.danger[500]} />
                </TouchableOpacity>
              </View>
            );
          }}
          ListEmptyComponent={RenderEmptyItem}
        />
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
