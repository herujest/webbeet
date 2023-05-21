import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import {RootDrawerParamList} from './screens';
import TabNavigator from './tabNavigator';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function DrawerNavigator() {
  // TODO: continue get list menu from redux
  // const listItemMenu: any[] = useSelector(({product}) => product.categories);
  // console.log('listItemMenu', listItemMenu);

  function ListMenuItem(props: any) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem label="Help" onPress={() => console.log('pressed')} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={props => <ListMenuItem {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          zIndex: 100,
        },
        drawerPosition: 'left',
        headerShown: false,
      }}>
      <Drawer.Screen name={'Tabs'} component={TabNavigator} />
    </Drawer.Navigator>
  );
}
