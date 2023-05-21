import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '_atom/Icon';
import Text from '_atom/Text';
import {IconName} from '_atom/index';
import useDebounce from '_hooks/useDebounce';
import useTheme from '_hooks/useTheme';
import moment from 'moment';
import React from 'react';
import {
  Pressable,
  StyleProp,
  Switch,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {CategoryPropertyDTO} from 'src/redux/reducers/product';

interface IInputField extends TextInputProps {
  label?: string;
  type?: 'default' | 'bordered' | 'stackedLabel' | 'borderBottomOnly';
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string | boolean) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  leftIcon?: IconName;
  iconColor?: string;
  inputFieldStyle?: StyleProp<ViewStyle>;
  right?: React.ReactNode;
  onPressLeftIcon?: () => void;
  error?: boolean;
  errorMessage?: string;
  inputMode?: CategoryPropertyDTO;
}
const InputField = ({
  label,
  onBlur,
  onFocus,
  onChangeText,
  disabled,
  type = 'default',
  leftIcon,
  iconColor,
  inputFieldStyle,
  right,
  onPressLeftIcon,
  error,
  errorMessage = '',
  inputMode,
  value,
  ...props
}: IInputField) => {
  const {Gutters, Common, Layout, Colors} = useTheme();
  const {inputStyles} = Common;

  const [isFocused, setIsFocused] = React.useState(false);
  const [showDate, setShowDate] = React.useState<boolean>(false);
  const [date, setDate] = React.useState(new Date());
  const [tempValue, setTempValue] = React.useState<string | boolean>('');
  const newValue = useDebounce(tempValue, 1000);

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  React.useEffect(() => {
    onChangeText && onChangeText(newValue);
  }, [newValue]);

  let inputStyle: StyleProp<ViewStyle> = {};
  const handleBlur = React.useCallback(() => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  }, [onBlur]);

  const handleFocus = React.useCallback(() => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  switch (type) {
    case 'borderBottomOnly':
      inputStyle = inputStyles.borderBottomOnlyInput;
      break;
    case 'bordered':
      inputStyle = inputStyles.borderedInput;
      break;

    default:
      inputStyle = inputStyles.borderedInput;
      break;
  }

  if (isFocused) {
    inputStyle = {
      ...inputStyle,
      ...inputStyles.focusedInput,
    };
  }

  if (error) {
    inputStyle = {
      ...inputStyle,
      ...inputStyles.errorInput,
    };
  }

  if (disabled) {
    inputStyle.opacity = 0.5;
  }

  return (
    <View style={inputFieldStyle}>
      {label ? <Text text={label} size="base" variant="semibold" /> : null}
      <View style={[Layout.row]}>
        {leftIcon && (
          <Pressable onPress={onPressLeftIcon} style={inputStyles.iconBox}>
            <Icon name={leftIcon} color={iconColor} />
          </Pressable>
        )}
        {inputMode === 'DATE' ? (
          <Pressable
            onPress={() => {
              setShowDate(true);
              // showDatePicker();
            }}
            style={(inputStyles.inputContainer, {width: '100%'})}>
            <TextInput
              style={[
                inputStyle,
                inputStyles.inputContainer,
                {color: Colors.neutral[500]},
              ]}
              value={moment(date).format('YYYY-MM-DD')}
              placeholder="YYYY-MM-DD"
              editable={false}
              {...props}
            />
            {showDate ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onChange}
              />
            ) : null}
          </Pressable>
        ) : inputMode === 'CHECKBOX' ? (
          <Switch
            thumbColor={Colors.white}
            trackColor={{false: Colors.neutral[300], true: Colors.primary[700]}}
            onValueChange={val => onChangeText && onChangeText(val)}
            value={value}
          />
        ) : (
          <TextInput
            style={[inputStyle, inputStyles.inputContainer]}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChangeText={val => {
              setTempValue(val);
            }}
            placeholder="Insert here"
            keyboardType={inputMode === 'NUMBER' ? 'number-pad' : 'default'}
            value={tempValue}
            {...props}
          />
        )}
        {right}
      </View>
      {error ? (
        <Text text={errorMessage} style={[error && inputStyles.errorLabel]} />
      ) : null}
    </View>
  );

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShowDate(false);
    onChangeText && onChangeText(moment(currentDate).format('YYYY-MM-DD'));
  }
};

export default InputField;
