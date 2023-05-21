import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ConnectedProps, connect} from 'react-redux';
import NavigationService from './navigators/NavigationService';
import {RootStackParamList} from './navigators/screens';
import StackNavigator from './navigators/stackNavigator';
import {RootState} from './redux';
import {setCurrentRouteName} from './redux/actions/main';

interface Props extends ReduxProps {}

function App(props: Props) {
  const {_setCurrentRouteName} = props;
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const routeNameRef = useRef<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializer = async () => {
      setIsLoading(true);
      // …do multiple sync or async tasks
      setIsLoading(false);
    };

    initializer().finally(async () => {});

    return () => {};
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
        NavigationService.setTopLevelNavigator(navigationRef);
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef?.getCurrentRoute()?.name;
        _setCurrentRouteName(currentRouteName);
        routeNameRef.current = currentRouteName;
      }}>
      <StackNavigator />
    </NavigationContainer>
  );
}

const mapStateToProps = ({}: RootState) => ({});

const mapDispatchToProps = {
  _setCurrentRouteName: setCurrentRouteName,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(App);
