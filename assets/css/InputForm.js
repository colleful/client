import styled from '@emotion/native';
import {Picker} from '@react-native-community/picker';

export const InputForm_title = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
`;
export const InputForm_container__borderWidth05 = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 0.5px solid black;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
`;
export const InputForm_container__borderWidth1 = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 1px solid black;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
`;

// 기본 input
export const InputForm_input = styled.TextInput`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 0.5px solid black;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
  padding: 10px;
`;

// View안에 아이콘과 함께 쓰이는 input
export const InputForm_inputWithIcon = styled.TextInput`
  width: 90%;
  height: 40px;
  padding: 10px;
`;

export const InputForm_errorMessage = styled.Text`
  color: #f54260;
  align-self: flex-start;
  margin-bottom: 10px;
`;
export const InputForm_button = styled.TouchableOpacity`
  width: 100%;
  background-color: #ec5990;
  border-radius: 4px;
  padding: 12px 0;
  margin: 5px 0;
`;
export const InputForm_buttonText = styled.Text`
  color: white;
  text-align: center;
`;
export const InputForm_passwordFindText = styled.Text`
  align-self: flex-end;
  color: #639fff;
  padding: 10px 0;
`;

export const InputForm_pickerContainer = styled(Picker)`
  height: 50px;
  width: 100%;
`;