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