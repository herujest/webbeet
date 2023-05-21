import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import {RootDrawerParamList} from './screens';
import TabNavigator from './tabNavigator';
import {useSelector} from 'react-redux';
import {MainCategoryDTO} from 'src/redux/reducers/product';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function DrawerNavigator() {
  const listItemMenu: any[] = useSelector(
    ({product}) => product.mainCategories,
  );

  function ListMenuItem(props: any) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem label="Help" onPress={() => console.log('pressed')} />
        {listItemMenu?.map((category: MainCategoryDTO, index: number) => {
          return (
            <DrawerItem
              key={index}
              label={category?.name}
              onPress={() => console.log('pressed')}
            />
          );
        })}
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
