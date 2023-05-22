import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  RootDrawerParamList,
  RootStackParamList,
  RootTabsParamList,
} from 'src/navigators/screens';

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabsParamList, 'Home'>,
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList>,
    DrawerScreenProps<RootDrawerParamList>
  >
>;

export type ManageCategoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabsParamList, 'ManageCategory'>,
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList>,
    DrawerScreenProps<RootDrawerParamList>
  >
>;

export type CreatePageScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'CreatePage'>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList>,
    DrawerScreenProps<RootDrawerParamList>
  >
>;

export type EditPageScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'EditPage'>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList>,
    DrawerScreenProps<RootDrawerParamList>
  >
>;

export type CreateItemCategoryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'CreateItemCategory'>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList>,
    DrawerScreenProps<RootDrawerParamList>
  >
>;

export type EditItemCategoryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'EditItemCategory'>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList>,
    DrawerScreenProps<RootDrawerParamList>
  >
>;

export type DrawerItemPageScreenProps = CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList, 'DrawerItemPage'>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabsParamList>,
    NativeStackScreenProps<RootStackParamList, 'CreateItemCategory'>
  >
>;
