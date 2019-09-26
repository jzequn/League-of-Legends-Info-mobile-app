import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  Main: MainTabNavigator,
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
