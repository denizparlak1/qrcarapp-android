import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TopBar = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => navigation.navigate('Settings')}
        >
            <Feather name="settings" size={24} color="#333" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    settingsIcon: {
        marginRight: 15,
    },
});

export default TopBar;
