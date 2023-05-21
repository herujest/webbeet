import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {setNavigationState} from '../redux/actions/main';
import {RootStackParamList, Screens} from './screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const dispatch = useDispatch();

  const _onNavigationStateChanges = (navState: any) => {
    if (navState.hasOwnProperty('index')) {
      dispatch(setNavigationState(navState));
    }
    return;
  };

  return (
    <Stack.Navigator
      screenListeners={{
        state: (e: any) => {
          _onNavigationStateChanges(e.data?.state);
        },
      }}
      screenOptions={{
        title: '',
        headerTitle: '',
      }}>
      {Screens.map((i, idx): JSX.Element => {
        return (
          <Stack.Screen
            key={idx}
            name={i.name}
            component={i.component}
            options={i.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}
