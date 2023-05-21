import {BackHandler, View} from 'react-native';
import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {CreateItemCategoryScreenProps} from 'src/utils/types';
import {Container, Content} from '_organism/Basic';
import {HeaderTitle} from '_molecule/Header';
import {InputField} from '_molecule/Input';
import {ItemPropDTO} from 'src/redux/reducers/product';
import useTheme from '_hooks/useTheme';
import {width} from '_theme/Layout';
import {isEmptyObj, uuidv4} from 'src/utils/helpers';
import NavigationService from 'src/navigators/NavigationService';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from 'src/redux';
import {addCategoryItem} from '_actions/product';

const actionMenus = ['Edit', 'Delete'];

const CreateItemCategory = (
  props: CreateItemCategoryScreenProps & ReduxProps,
) => {
  const {route, navigation, _addCategoryItem} = props;
  const dropdownRef = React.useRef<any>();
  const {Gutters, Colors, Layout, Fonts, FontSize} = useTheme();

  const [inputData, setInputData] = React.useState<ItemPropDTO[]>([]);
  const [payloadItem, setPayloadItem] = React.useState<any>({});

  React.useEffect(() => {
    setInputData(route?.params?.categoryConfig?.properties);
  }, []);

  const _backAction = () => {
    if (!isEmptyObj(payloadItem)) {
      const payload: any = {
        id: uuidv4(),
        ...payloadItem,
      };

      _addCategoryItem(route?.params?.categoryConfig?.id, payload);
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
      <HeaderTitle
        title={route?.params?.categoryConfig?.name}
        onPressLeftIcon={_backAction}
        rightIcon="three-dots-vertical"
        onPressRightIcon={() => dropdownRef.current?.show()}
      />
      <View style={[{alignSelf: 'flex-end'}]}>
        <ModalDropdown
          ref={dropdownRef}
          options={actionMenus}
          textStyle={[{display: 'none'}]}
          dropdownStyle={[
            Gutters.largeTMargin,
            {
              right: 0,
              alignItems: 'center',
              width: width * 0.2,
            },
          ]}
          dropdownTextStyle={[Fonts.normal, {fontSize: FontSize.sm}]}
          dropdownTextHighlightStyle={[
            Fonts.semibold,
            {
              fontSize: FontSize.sm,
              color: Colors.secondary[700],
            },
          ]}
          onSelect={onSelectDropdown}
        />
      </View>
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
      </Content>
    </Container>
  );

  function onSelectDropdown(idx) {
    // if(idx === )
    console.log('idx', idx);
  }
};

const mapStateToProps = ({}: RootState) => ({});

const mapDispatchToProps = {
  _addCategoryItem: addCategoryItem,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;
export default connector(CreateItemCategory);
