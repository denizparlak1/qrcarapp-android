import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { signOut } from '../auth/auth';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await signOut();
            // Add any additional code you want to execute on successful logout here
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.buttonContainer}>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        marginHorizontal: 50,
    },
});

export default LogoutButton;
