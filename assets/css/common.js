import styled from '@emotion/native';
import {Picker} from '@react-native-community/picker';

export const FormTitle = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
`;
export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: ${(props) => (props.bw1 ? '1px' : '0.5px')} solid black;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 4px;
`;

export const Input = styled.TextInput`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 0.5px solid black;
  height: 40px;
  margin-bottom: 5px;
  ${(props) => props.mb15 && 'margin-bottom: 15px'};
  border-radius: 4px;
  padding: 10px;
`;

export const InputWithIcon = styled.TextInput`
  width: 90%;
  height: 40px;
  padding: 10px;
`;

export const ErrorMessage = styled.Text`
  color: #f54260;
  align-self: flex-start;
  margin-bottom: 10px;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => (props.pink ? '#ec5990' : '#5e5e5e')};
  border-radius: 4px;
  padding: 12px 0;
  margin: 5px 0;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;
export const PasswordFindText = styled.Text`
  align-self: flex-end;
  color: #639fff;
  padding: 10px 0;
`;

export const PickerContainer = styled(Picker)`
  height: 50px;
  width: 100%;
`;
