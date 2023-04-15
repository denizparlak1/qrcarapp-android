import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from "../pages/login/LoginPage";
import UserPage from "../pages/user/UserPage";
import {Settings} from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="User" component={UserPage} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
