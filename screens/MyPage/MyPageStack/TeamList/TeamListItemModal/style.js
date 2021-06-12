import Modal from 'react-native-modal';
import styled from '@emotion/native';

export const BorderLine = styled.View`
  width: 100%;
  border: 0.5px solid #cccccc;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: AntDesign;
`;

export const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.h100 ? '100px' : '50px')};
  border: 0.25px solid gray;
  background-color: #fff;
`;

export const RestSpace = styled.TouchableOpacity`
  flex: 1;
`;

export const StyledModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;
