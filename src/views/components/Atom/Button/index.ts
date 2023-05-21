import Variables from '_theme/Variables';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {IconName, TFontSizes} from '../index';
import Button from './Button';

type buttonTypes = 'primary' | 'outline' | 'iconOnly';
type color = typeof Variables.Colors | string | string[];

export interface IButton extends TouchableOpacityProps {
  title?: string;
  type?: buttonTypes;
  loading?: boolean;
  titleSize?: typeof Variables.FontSize | number;
  titleVariant?: 'light' | 'normal' | 'semibold' | 'bold';
}

export interface IButtonPrimary extends Omit<IButton, 'type'> {
  colors?: string;
  borderWidth?: number;
}

export interface IButtonOutline extends Omit<IButton, 'type'> {
  borderWidth?: number;
  titleStyle?: StyleProp<TextStyle>;
}

export interface IButtonBody extends IButton {
  icon?: IconName;
  iconSize?: TFontSizes;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
  buttonActive?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  buttonBodyStyle?: StyleProp<ViewStyle>;
}

export interface IButtonIcon extends TouchableOpacityProps {
  icon?: IconName;
  iconSize?: TFontSizes;
  iconColor?: string;
  noBorder?: boolean;
  borderColor?: string;
}

export {Button};
