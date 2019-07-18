import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './components/HomeScreen'

const AppNavigator = createStackNavigator({
    HomeScreen: {screen: HomeScreen},
});

const App = createAppContainer(AppNavigator);

export default App;