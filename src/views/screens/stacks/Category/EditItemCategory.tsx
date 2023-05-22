/**
 * TODO: check editable not auto fill for every field
 */
import {addCategoryItem, deleteCategory, editCategory} from '_actions/product';
import {Button} from '_atom/Button';
import useTheme from '_hooks/useTheme';
import {HeaderTitle} from '_molecule/Header';
import {InputField} from '_molecule/Input';
import {Container, Content} from '_organism/Basic';
import React from 'react';
import {BackHandler, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {ConnectedProps, connect} from 'react-redux';
import NavigationService from 'src/navigators/NavigationService';
import {RootState} from 'src/redux';
import {ItemPropDTO} from 'src/redux/reducers/product';
import {isEmptyObj, uuidv4} from 'src/utils/helpers';
import {CreateItemCategoryScreenProps} from 'src/utils/types';

const EditItemCategory = (
  props: CreateItemCategoryScreenProps & ReduxProps,
) => {
  const {route, navigation, _addCategoryItem, _deleteCategory} = props;
  const {Gutters, Colors, Layout, Fonts, FontSize} = useTheme();
  const category = route?.params?.categoryConfig;
  const editableItem = route?.params?.editableItem;

  const [inputData, setInputData] = React.useState<ItemPropDTO[]>([]);
  const [payloadItem, setPayloadItem] = React.useState<any>({});

  React.useEffect(() => {
    inputData?.forEach((i: ItemPropDTO) => {
      console.log(
        '[i.value]: editableItem[i.value]?.toString(),',
        i.value,
        editableItem[i.value]?.toString(),
      );

      setPayloadItem({
        ...payloadItem,
        [i.value]: editableItem[i.value]?.toString(),
      });
    });
  }, [inputData]);

  React.useEffect(() => {
    setInputData(category?.properties);
  }, []);

  const _backAction = () => {
    if (!isEmptyObj(payloadItem)) {
      const payload: any = {
        id: uuidv4(),
        ...payloadItem,
      };

      _addCategoryItem(category?.id, payload);
    }

    NavigationService.navigateBack();
    return true;
  };

  React.useEffect(() => {
    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      _backAction,
    );

    return () => {
      handler.remove();
    };
  }, [navigation]);

  const onChangeText = (val, item) => {
    setPayloadItem({
      ...payloadItem,
      [item?.value]: val,
    });
  };

  return (
    <Container>
      <HeaderTitle title={category?.name} onPressLeftIcon={_backAction} />

      <KeyboardAwareFlatList
        contentContainerStyle={Gutters.smallTMargin}
        enableOnAndroid={true}
        contentInsetAdjustmentBehavior="always"
        extraHeight={300}
        enableAutomaticScroll
        data={inputData}
        extraData={[inputData, editableItem, editCategory]}
        style={[Gutters.largePadding, {backgroundColor: Colors.white}]}
        renderItem={({item, index}: {item: ItemPropDTO; index: number}) => {
          console.log('payloadItem', payloadItem);

          return (
            <InputField
              key={index}
              label={item?.value}
              inputFieldStyle={Gutters.smallBMargin}
              inputMode={item?.type}
              onChangeText={val => onChangeText(val, item)}
              value={payloadItem[item?.value]}
            />
          );
        }}
        ListFooterComponent={
          <Button
            title="Edit Properties"
            colors={Colors.danger[300]}
            onPress={() => {
              NavigationService.navigate(
                'EditPage',
                {category},
                `edit-${category?.id}`,
              );
            }}
          />
        }
      />
    </Container>
  );
};

const mapStateToProps = ({}: RootState) => ({});

const mapDispatchToProps = {
  _addCategoryItem: addCategoryItem,
  _deleteCategory: deleteCategory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(EditItemCategory);
