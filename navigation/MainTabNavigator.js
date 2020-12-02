import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import { Ionicons } from '@expo/vector-icons';

import ChampionsScreen from '../screens/ChampionsScreen'
import ItemsScreen from '../screens/ItemsScreen'
import SearchScreen from '../screens/SearchScreen'
import ItemDetailScreen from '../screens/ItemDetailScreen'
import ChampionDetailScreen from '../screens/ChampionDetailScreen'
import AboutScreen from '../screens/AboutScreen'
import AccountScreen from '../screens/AccountScreen'
import MatchScreen from '../screens/MatchScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? "#14eaf5" : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : "#14eaf5"
}

const ChampionStack = createStackNavigator(
  {
    Champions: ChampionsScreen,
    ChampionDetail: ChampionDetailScreen
  },
  {
    web: { headerMode: 'screen' },
    default: {},
    defaultNavigationOptions: defaultStackNavOptions,

  }

);

ChampionStack.navigationOptions = {
  tabBarLabel: 'Champions',
  tabBarIcon: ({ focused }) => (
    <Ionicons focused={focused} name='ios-people' size={25} />

  ),
};

ChampionStack.path = '';

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Match: MatchScreen,
  },
  {
    web: { headerMode: 'screen' },
    default: {},
    defaultNavigationOptions: defaultStackNavOptions,

  }

);

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

SearchStack.path = '';

// put two screen in one stack, so that user can navigate from one screen to another
const ItemStack = createStackNavigator(
  {
    Items: ItemsScreen,
    ItemDetail: ItemDetailScreen,
  },
  {
    web: { headerMode: 'screen' },
    default: {},
    defaultNavigationOptions: defaultStackNavOptions,

  }

);
ItemStack.navigationOptions = {
  tabBarLabel: 'Items',
  tabBarIcon: ({ focused }) => (
    <Ionicons focused={focused} name='ios-leaf' size={25} />
  ),
};
ItemStack.path = '';


const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
  },
  {
    web: { headerMode: 'screen' },
    default: {},
    defaultNavigationOptions: defaultStackNavOptions,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? "green" : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : "green"
    }
  }

);
AboutStack.path = '';


const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
  },
  {
    web: { headerMode: 'screen' },
    default: {},
    defaultNavigationOptions: defaultStackNavOptions,
  }

);
AccountStack.path = '';

const tabNavigator = createBottomTabNavigator({

  ChampionStack,
  SearchStack,
  ItemStack,
});

tabNavigator.path = '';


const MainNavigator = createDrawerNavigator({
  Champions: {
    screen: tabNavigator,
    navigationOptions: {
      drawerLabel: 'Champions'
    }
  },
  About: AboutStack,
  Account: AccountStack,

}, {
  contentOptions: {
    activeTintColor: '#badbad'
  }
})

// export default tabNavigator;
export default createAppContainer(MainNavigator);
