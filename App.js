import React from 'react';
import Expo from 'expo'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import FlightListScreen from './screens/FlightListScreen';
import SearchScreen from './screens/SearchScreen';



const MainNavigator = createStackNavigator({
  search: { 
    screen: SearchScreen,
    navigationOptions: { title: 'Search Flights' }
  },
  list: { 
    screen: FlightListScreen,
    navigationOptions: { title: 'Select your Flight' }
  }
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
