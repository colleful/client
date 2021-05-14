import styled from '@emotion/native';
import {Picker} from '@react-native-community/picker';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 20px;
`;
export const AuthForm = styled.View`
  align-items: center;
`;
export const AuthForm_inputTitle = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
`;
export const AuthForm_inputContainer = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 0.5px solid black;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
`;
export const AuthForm_input = styled.TextInput`
  width: 90%;
  height: 40px;
  padding: 10px;
`;
export const AuthForm_errorMessage = styled.Text`
  color: #f54260;
  align-self: flex-start;
  margin-bottom: 10px;
`;
export const AuthForm_button = styled.TouchableOpacity`
  width: 100%;
  background-color: #ec5990;
  border-radius: 4px;
  padding: 12px 0;
  margin: 5px 0;
`;
export const AuthForm_buttonText = styled.Text`
  color: white;
  text-align: center;
`;
export const AuthForm_passwordFindText = styled.Text`
  align-self: flex-end;
  color: #639fff;
  padding: 10px 0;
`;

export const AuthForm_pickerContainer = styled(Picker)`
  height: 50px;
  width: 100%;
`;
export const AuthForm__marginBottom15 = styled.View`
  margin-bottom: 15px;
`;
