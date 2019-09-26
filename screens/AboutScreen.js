import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';

export default function AboutScreen() {
  return (
    <View>
      <View>
        <Text>Current version: 6.24.1</Text>
      </View>

      <View>
        <Text>Feel free to contacts us if you have any questions and ideas</Text>
      </View>
      <View>
        <Text>Email Address: jzequn@gmail.com</Text>
        <Text>Phone: +64-123-4567</Text>
        <Text>Location: Wellington, New Zealand</Text>
        <Text>Developer: Jiang Zequn</Text>
      </View>
    </View>
  );
}

AboutScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'About',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }

}