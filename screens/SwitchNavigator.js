import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import MainNavigator from './MainNavigator';

const SwitchNavigator = ({
  onCreateAddress,
  form,
  getDepartmentId,
  getGender,
  getBirthYear,
  onSendAuthEmail,
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  onChangeNickname,
  onChangeBirthYear,
  onChangeGender,
  onChangeDepartmentId,
  onChangeSelfIntroduction,
  onChangeCode,
  onConfirmAuthEmail,
  onSubmit,
  error,
}) => {
  const SwitchNavStack = createStackNavigator();
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainNavigator />
      ) : (
        <SwitchNavStack.Navigator screenOptions={{headerShown: false}}>
          {/* <SwitchNavStack.Screen name="SplashScreen" component={SplashScreen} /> */}

          <SwitchNavStack.Screen name="LoginScreen">
            {(props) => <LoginScreen {...props} />}
          </SwitchNavStack.Screen>

          <SwitchNavStack.Screen name="RegisterScreen">
            {(props) => (
              <RegisterScreen
                {...props}
                form={form}
                getDepartmentId={getDepartmentId}
                getGender={getGender}
                getBirthYear={getBirthYear}
                onSendAuthEmail={onSendAuthEmail}
                onCreateAddress={onCreateAddress}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onChangePasswordConfirm={onChangePasswordConfirm}
                onChangeNickname={onChangeNickname}
                onChangeBirthYear={onChangeBirthYear}
                onChangeGender={onChangeGender}
                onChangeDepartmentId={onChangeDepartmentId}
                onChangeSelfIntroduction={onChangeSelfIntroduction}
                onChangeCode={onChangeCode}
                onConfirmAuthEmail={onConfirmAuthEmail}
                onSubmit={onSubmit}
                error={error}
              />
            )}
          </SwitchNavStack.Screen>
        </SwitchNavStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default SwitchNavigator;
