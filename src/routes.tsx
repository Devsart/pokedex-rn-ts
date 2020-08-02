import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import Register from './pages/Register';
import Details from './pages/Details';

const AppStack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" screenOptions={{cardStyle: {backgroundColor: '#f0f0f5'}}}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Pokedex" component={Pokedex} />
                <AppStack.Screen name="Details" component={Details} />
                <AppStack.Screen name="Register" component={Register} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;