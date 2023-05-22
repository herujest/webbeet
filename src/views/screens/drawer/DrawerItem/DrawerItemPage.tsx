import useTheme from '_hooks/useTheme';
import {HeaderTitle} from '_molecule/Header';
import {Container, Content} from '_organism/Basic';
import CategoryWrapper from '_organism/Layout/CategoryWrapper';
import React from 'react';
import {DrawerItemPageScreenProps} from 'src/utils/types';

const DrawerItemPage = (props: DrawerItemPageScreenProps) => {
  const {route} = props;
  const {Gutters, Colors, Layout} = useTheme();

  return (
    <Container>
      <HeaderTitle
        leftIcon="menu"
        title={route?.params?.category?.name}
        onPressLeftIcon={props.navigation.openDrawer}
      />
      <Content contentContainerStyle={Gutters.largePadding}>
        <CategoryWrapper category={route?.params?.category} />
      </Content>
    </Container>
  );
};

export default DrawerItemPage;
