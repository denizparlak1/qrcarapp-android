import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import UserPage from './src/pages/UserPage';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginPage">
                <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="UserPage" component={UserPage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
