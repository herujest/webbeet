import {Icon, Text} from '_atom/index';
import {optionsType} from '_constant/app';
import useTheme from '_hooks/useTheme';
import {HeaderTitle} from '_molecule/Header';
import {InputField} from '_molecule/Input';
import {Container} from '_organism/Basic';
import {width} from '_theme/Layout';
import React from 'react';
import {BackHandler, Pressable, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';
import {ItemPropDTO} from 'src/redux/reducers/product';
import {uuidv4} from 'src/utils/helpers';
import {RenderInputField} from './CustomInputField';
import {CreatePageScreenProps} from 'src/utils/types';
import NavigationService from 'src/navigators/NavigationService';

const ListFooterComponent = ({
  onAddNewField,
  onOpenDropdown,
  dropdownRef,
  onSelectDropdown,
}: {
  onAddNewField: (param: any) => any;
  onOpenDropdown: (param: any) => any;
  dropdownRef: any;
  onSelectDropdown: (param: any) => any;
}) => {
  const {Colors, Gutters, Layout, Fonts, FontSize} = useTheme();

  return (
    <View
      style={[
        Gutters.largeBMargin,
        Gutters.smallTMargin,
        Gutters.largePadding,
        {backgroundColor: Colors.white},
      ]}>
      <Text
        text="CUSTOM FIELDS"
        style={[Gutters.smallBMargin]}
        variant="semibold"
      />
      <View>
        <Pressable onPress={onAddNewField} style={Layout.row}>
          <View style={{flex: 1}}>
            <Icon name="plus" color={Colors.secondary[600]} />
          </View>
          <Text
            style={{flex: 9}}
            text="New Custom Field"
            size="base"
            variant="light"
          />
        </Pressable>
        <View style={{flex: 9}}>
          <Pressable
            onPress={onOpenDropdown}
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.smallPadding,
              Gutters.tinyTMargin,
              {
                borderRadius: width * 0.03,
                backgroundColor: Colors.neutral[200],
              },
            ]}>
            <ModalDropdown
              ref={dropdownRef}
              options={optionsType}
              defaultValue={optionsType[0]}
              textStyle={[
                Fonts.normal,
                {fontSize: FontSize.sm, color: Colors.neutral[800]},
              ]}
              dropdownStyle={[
                Gutters.largeTMargin,
                {
                  width: width * 0.7,
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
            <Icon name="circle-down" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const CreatePage = (props: CreatePageScreenProps) => {
  const {navigation} = props;
  const dropdownRef = React.useRef<any>();
  const {Colors, Gutters} = useTheme();

  const [tempItemProp, setTempItemProp] = React.useState<ItemPropDTO[]>([]);
  const [currentType, setCurrentType] = React.useState<ItemPropDTO>({
    id: uuidv4(),
    value: '',
    type: optionsType[0].toUpperCase(),
  });

  const _backAction = () => {
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

  const onSelect = React.useCallback((idx: number) => {
    const data = {
      id: '',
      value: '',
      type: optionsType[idx].toUpperCase(),
    };
    setCurrentType(data);

    dropdownRef.current.hide();
  }, []);

  const onOpenDropdown = React.useCallback(() => {
    dropdownRef.current.show();
  }, []);

  const onAddNewField = React.useCallback(() => {
    const data = {
      ...currentType,
      id: uuidv4(),
    };
    console.log('pressed', data);

    setTempItemProp([...tempItemProp, data]);
  }, [tempItemProp, currentType]);

  const removeItemFromList = React.useCallback(
    (item: ItemPropDTO) => {
      const idx = tempItemProp.findIndex(i => i.id === item.id);
      setTempItemProp([
        ...tempItemProp.slice(0, idx),
        ...tempItemProp.slice(idx + 1),
      ]);
    },
    [tempItemProp],
  );

  const onChangeValueItem = (modifiedData: ItemPropDTO, id: string) => {
    const cloneItemProp = tempItemProp.map(i => {
      if (i.id === id) {
        i = modifiedData;
      }
      return i;
    });

    setTempItemProp(cloneItemProp);
  };

  return (
    <Container>
      <HeaderTitle title="Add New Category" onPressLeftIcon={_backAction} />

      <KeyboardAwareFlatList
        enableOnAndroid={true}
        contentInsetAdjustmentBehavior="always"
        extraHeight={300}
        enableAutomaticScroll
        ListHeaderComponent={
          <View style={[Gutters.smallPadding, {backgroundColor: Colors.white}]}>
            <InputField label="Category Name" />
          </View>
        }
        contentContainerStyle={[Gutters.smallVPadding]}
        data={tempItemProp}
        extraData={[tempItemProp]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <RenderInputField
              key={index}
              item={item}
              onRemove={removeItemFromList}
              onChangeValue={(modifiedData: ItemPropDTO) => {
                onChangeValueItem(modifiedData, item.id);
              }}
            />
          );
        }}
        ListFooterComponent={
          <ListFooterComponent
            onAddNewField={onAddNewField}
            onOpenDropdown={onOpenDropdown}
            dropdownRef={dropdownRef}
            onSelectDropdown={onSelect}
          />
        }
      />
    </Container>
  );
};

export default CreatePage;
