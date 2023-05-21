import Text from '_atom/Text';
import {optionsType} from '_constant/app';
import useDebounce from '_hooks/useDebounce';
import useTheme from '_hooks/useTheme';
import {InputField} from '_molecule/Input';
import {width} from '_theme/Layout';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {ItemPropDTO} from 'src/redux/reducers/product';
import {capitalizeFirstLetter} from 'src/utils/helpers';

export const RenderInputField = ({
  item,
  onRemove,
  onChangeValue,
}: {
  item: ItemPropDTO;
  onRemove: (item: any) => any;
  onChangeValue: (val: string) => any;
}) => {
  const dropdownRef = React.useRef<any>();
  const {Colors, Gutters, Layout, Fonts, FontSize} = useTheme();

  const [editableItem, setEditableItem] = React.useState<ItemPropDTO>({
    type: '',
  });
  const [value, setValue] = React.useState<string>('');
  const [currentType, setCurrentType] = React.useState<string>('');
  const newValue = useDebounce(value, 1000);

  React.useEffect(() => {
    onChangeValue({
      ...item,
      value: newValue,
    });
  }, [newValue]);

  React.useEffect(() => {
    setEditableItem(item);
    setCurrentType(item?.type?.toUpperCase());
  }, [item]);

  React.useEffect(() => {
    console.log('editableItem', editableItem);
  }, [editableItem]);

  const onOpenDropdown = React.useCallback(() => {
    dropdownRef.current.show();
  }, []);

  const onSelect = React.useCallback((idx: number) => {
    const data = {
      id: '',
      value: '',
      type: optionsType[idx].toUpperCase(),
    };
    setEditableItem(data);
    setCurrentType(data?.type);
    onChangeValue({
      ...editableItem,
      type: data?.type,
    });

    dropdownRef.current.hide();
  }, []);

  return (
    <View style={{backgroundColor: Colors.white}}>
      <InputField
        type="borderBottomOnly"
        leftIcon="minus"
        iconColor={Colors.danger[600]}
        onPressLeftIcon={() => onRemove(item)}
        value={value}
        onChangeText={setValue}
        placeholder="Name"
        inputFieldStyle={[Gutters.smallMargin, Gutters.tinyRPadding, {flex: 7}]}
        right={
          <TouchableOpacity
            onPress={onOpenDropdown}
            style={[Layout.center, {flex: 3}]}>
            <Text
              text={capitalizeFirstLetter(editableItem?.type)}
              size="xs"
              style={[
                Gutters.smallHPadding,
                Gutters.tinyVPadding,
                {
                  backgroundColor: Colors.primary[700],
                  borderRadius: width * 0.02,
                  textAlign: 'center',
                  color: Colors.offWhite,
                },
              ]}
            />

            <ModalDropdown
              ref={dropdownRef}
              options={optionsType}
              defaultValue={currentType}
              textStyle={[
                Fonts.normal,
                {
                  fontSize: FontSize.sm,
                  display: 'none',
                },
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
              onSelect={onSelect}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};
