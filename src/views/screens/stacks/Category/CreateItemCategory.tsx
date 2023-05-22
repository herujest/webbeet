import {addCategoryItem, deleteCategory} from '_actions/product';
import {Button} from '_atom/Button';
import useTheme from '_hooks/useTheme';
import {HeaderTitle} from '_molecule/Header';
import {InputField} from '_molecule/Input';
import {Container, Content} from '_organism/Basic';
import React from 'react';
import {BackHandler, View} from 'react-native';
import {ConnectedProps, connect} from 'react-redux';
import NavigationService from 'src/navigators/NavigationService';
import {RootState} from 'src/redux';
import {ItemPropDTO} from 'src/redux/reducers/product';
import {isEmptyObj, uuidv4} from 'src/utils/helpers';
import {CreateItemCategoryScreenProps} from 'src/utils/types';

const CreateItemCategory = (
  props: CreateItemCategoryScreenProps & ReduxProps,
) => {
  const {route, navigation, _addCategoryItem, _deleteCategory} = props;
  const {Gutters, Colors, Layout, Fonts, FontSize} = useTheme();
  const category = route?.params?.categoryConfig;

  const [inputData, setInputData] = React.useState<ItemPropDTO[]>([]);
  const [payloadItem, setPayloadItem] = React.useState<any>({});

  React.useEffect(() => {
    setInputData(category?.properties);
  }, []);

  const _backAction = () => {
    // if (!isEmptyObj(payloadItem)) {
    const payload: any = {
      id: uuidv4(),
      ...payloadItem,
    };

    console.log('payload', payload);

    // _addCategoryItem(category?.id, payload);
    // }

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

      <Content contentContainerStyle={Gutters.smallTMargin}>
        <View style={[Gutters.largePadding, {backgroundColor: Colors.white}]}>
          {inputData?.map((item: ItemPropDTO) => {
            return (
              <InputField
                label={item?.value}
                inputFieldStyle={Gutters.smallBMargin}
                inputMode={item?.type}
                onChangeText={val => onChangeText(val, item)}
                value={payloadItem[item?.value]}
              />
            );
          })}
        </View>
        <Button
          title="Edit"
          colors={Colors.danger[300]}
          onPress={() => {
            NavigationService.navigate(
              'CreatePage',
              {
                editMode: true,
                editableData: category,
              },
              `editProp_#${category?.id}`,
            );
          }}
        />
        <Button
          title="Remove"
          colors={Colors.danger[700]}
          onPress={() => {
            _deleteCategory(category?.id);
            setTimeout(() => {
              NavigationService.navigateBack();
            }, 350);
          }}
        />
      </Content>
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
export default connector(CreateItemCategory);
