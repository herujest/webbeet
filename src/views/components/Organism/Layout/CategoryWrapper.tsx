import {deleteCategoryItem} from '_actions/product';
import {Button} from '_atom/Button';
import Icon from '_atom/Icon';
import Text from '_atom/Text';
import useTheme from '_hooks/useTheme';
import {InputField} from '_molecule/Input';
import {width} from '_theme/Layout';
import React from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {ConnectedProps, connect} from 'react-redux';
import NavigationService from 'src/navigators/NavigationService';
import {RootState} from 'src/redux';
import {ItemPropDTO, MainCategoryDTO} from 'src/redux/reducers/product';

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
    _deleteCategoryItem(category?.id, item?.id);
  };

  const editItem = item => {
    NavigationService.navigate('EditItemCategory', {
      categoryConfig: category,
      editableItem: item,
    });
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
                        editable={false}
                        // onChangeText={val => onChangeText(val, item)}
                        value={item[i?.value]}
                      />
                    );
                  })}
                </View>
                <View style={[Layout.center, Gutters.xlargeTMargin, {flex: 1}]}>
                  <TouchableOpacity onPress={() => removeItem(item)}>
                    <Icon name="trash-can" color={Colors.danger[500]} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => editItem(item)}
                    style={Gutters.xlargeTMargin}>
                    <Icon name="pencil" color={Colors.neutral[400]} />
                  </TouchableOpacity>
                </View>
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
