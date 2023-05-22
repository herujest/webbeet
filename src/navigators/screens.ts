import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {MainCategoryDTO} from 'src/redux/reducers/product';
import {HomeScreenProps, ManageCategoryScreenProps} from 'src/utils/types';
import {CreatePage} from 'src/views/screens/stacks';
import {CreateItemCategory, EditPage} from 'src/views/screens/stacks/Category';
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
  {
    name: 'EditPage',
    component: EditPage,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'CreateItemCategory',
    component: CreateItemCategory,
    options: {
      headerShown: false,
    },
  },
];

export const Screens = [...MainScreen];

export type RootStackParamList = {
  CreatePage: undefined;
  CreateItemCategory: {categoryConfig: MainCategoryDTO};
  EditPage: {category: MainCategoryDTO};
};

export type RootDrawerParamList = {
  Tabs: undefined;
  Stacks: undefined;
  DrawerItemPage: {pageData: MainCategoryDTO};
};

export type RootTabsParamList = {
  Home: HomeScreenProps;
  ManageCategory: ManageCategoryScreenProps;
};
