import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginContainer from '../container/LoginContainer';
import RegisterContainer from '../container/RegisterContainer';
import MainNavigator from './MainNavigator';
import SplashScreen from './SplashScreen';

import {useSelector, useDispatch} from 'react-redux';
const SwitchNavigator = () => {
  // if (isLoading) {
  //   // 아직 로그인 토큰 확인이 끝나지 않았을때 스플래시 스크린 띄우기
  //   return <SplashScreen />;
  // }
  const SwitchNavStack = createStackNavigator();

  const {isLoggedIn} = useSelector(({auth}) => ({
    isLoggedIn: auth.isLoggedIn,
  }));
  
  return (
    <SwitchNavStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <SwitchNavStack.Screen name="MainNavigator" component={MainNavigator} />
      ) : (
        <>
          <SwitchNavStack.Screen
            name="LoginContainer"
            component={LoginContainer}
          />
          <SwitchNavStack.Screen
            name="RegisterContainer"
            component={RegisterContainer}
          />
        </>
      )}
    </SwitchNavStack.Navigator>
  );
};

export default SwitchNavigator;
