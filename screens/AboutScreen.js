import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { ExpoConfigView } from '@expo/samples';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cardLayout}>
        <View style={styles.card}>
          <Text>Current version: 6.24.1</Text>
        </View>
      </View>

      <View style={styles.cardLayout}>
        <View style={styles.card}>
          <Text>Feel free to contacts us if you have any questions and ideas</Text>
        </View>
      </View>
      <View style={styles.cardLayout}>
        <View style={styles.card}>
          <Text>Email Address: jzequn@gmail.com</Text>
          <Text>Phone: +64-123-4567</Text>
          <Text>Location: Wellington, New Zealand</Text>
          <Text>Developer: Jiang Zequn</Text>
        </View>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  cardLayout: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%'
  },
  card: {
    padding: 5,
    width: '100%',
    borderRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 2, height: 3 },
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1,
    borderBottomStartRadius: 0,
    marginBottom: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
  },
});
