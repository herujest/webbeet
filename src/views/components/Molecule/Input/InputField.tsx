import Icon from '_atom/Icon';
import Text from '_atom/Text';
import {IconName} from '_atom/index';
import useTheme from '_hooks/useTheme';
import React from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface IInputField extends TextInputProps {
  label?: string;
  type?: 'default' | 'bordered' | 'stackedLabel' | 'borderBottomOnly';
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  leftIcon?: IconName;
  iconColor?: string;
  inputFieldStyle?: StyleProp<ViewStyle>;
  right?: React.ReactNode;
  onPressLeftIcon?: () => void;
  error?: boolean;
  errorMessage?: string;
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
  ...props
}: IInputField) => {
  const {Gutters, Common, Layout} = useTheme();
  const {inputStyles} = Common;

  const [isFocused, setIsFocused] = React.useState(false);

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
        <TextInput
          style={[inputStyle, inputStyles.inputContainer]}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          placeholder="Insert here"
          {...props}
        />
        {right}
      </View>
      {error ? (
        <Text text={errorMessage} style={[error && inputStyles.errorLabel]} />
      ) : null}
    </View>
  );
};

export default InputField;
