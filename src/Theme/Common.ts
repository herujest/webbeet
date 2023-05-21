/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import {StyleSheet} from 'react-native';
import buttonStyles from './components/Buttons';
import headerStyles from './components/Headers';
import inputStyles from './components/InputField';
import {CommonParams} from './theme';

export default function <C>({Colors, ...args}: CommonParams<C>) {
  return {
    button: buttonStyles({Colors, ...args}),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary[600],
      },
      backgroundLayout: {
        backgroundColor: Colors.white,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.neutral[500],
        backgroundColor: Colors.white,
        color: Colors.neutral[500],
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
      elevated: {
        shadowOffset: {width: 0, height: 2},
        shadowColor: Colors.neutral[500],
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      },
      bottomTabsContainer: {
        backgroundColor: Colors.white,
        flex: 1,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 10,
        shadowOpacity: 0.1,
      },
      buttonTab: {
        flex: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
      },
    }),
    header: headerStyles({Colors, ...args}),
    inputStyles: inputStyles({Colors, ...args}),
  };
}
