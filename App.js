import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import UserPageStack from "./src/pages/user/UserPage";
import LoginPage from "./src/pages/login/LoginPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        setIsLoggedIn(true);
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogin = (uid) => {
    setUserId(uid);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? <UserPageStack userId={userId} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />;
};

export default App;
