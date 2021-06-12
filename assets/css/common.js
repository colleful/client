import styled from '@emotion/native';
import {Picker} from '@react-native-community/picker';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: ${(props) => (props.bw1 ? '1px' : '0.5px')} solid black;
  border-radius: 4px;
`;

export const InputTitle = styled.Text`
  align-self: flex-start;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  padding: 10px;
  border: 0.5px solid black;
  ${(props) => props.mb15 && 'margin-bottom: 15px'};
  border-radius: 4px;
`;

export const InputWithIcon = styled.TextInput`
  width: 90%;
  height: 40px;
  padding: 10px;
`;

export const ErrorMessage = styled.Text`
  align-self: flex-start;
  margin-bottom: 10px;
  color: #f54260;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 0;
  margin: 5px 0;
  border-radius: 4px;
  background-color: ${(props) => (props.pink ? '#ec5990' : '#5e5e5e')};
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;

export const PasswordFindText = styled.Text`
  align-self: flex-end;
  padding: 10px 0;
  color: #639fff;
`;

export const PickerContainer = styled(Picker)`
  width: 100%;
  height: 50px;
`;

export const BorderLine = styled.View`
  margin-bottom: 15px;
`;
