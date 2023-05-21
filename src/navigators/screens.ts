import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {HomeScreenProps, ManageCategoryScreenProps} from 'src/utils/types';
import {CreatePage} from 'src/views/screens/stacks';
import DrawerNavigator from './drawerNavigator';

interface INavigationOption {
  name: string;
  component: React.ComponentType<any>;
  options: NativeStackNavigationOptions;
}

const MainScreen: Array<INavigationOption> = [
  {
    name: 'Drawer',
    component: DrawerNavigator,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CreatePage',
    component: CreatePage,
    options: {
      headerShown: false,
    },
  },
];

export const Screens = [...MainScreen];

export type RootStackParamList = {
  CreatePage: undefined;
};

export type RootDrawerParamList = {
  Tabs: undefined;
  Stacks: undefined;
};

export type RootTabsParamList = {
  Home: HomeScreenProps;
  ManageCategory: ManageCategoryScreenProps;
};
