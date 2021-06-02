import Modal from 'react-native-modal';
import styled from '@emotion/native';

export const BorderLine = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: AntDesign;
`;

export const ButtonContainer = styled.View`
  height: ${(props) => (props.h100 ? '100px' : '50px')};
  justify-content: center;
  align-items: center;
  border-bottom-width: 0.5px;
  border-color: gray;
  background-color: #fff;
`;

export const RestSpace = styled.TouchableOpacity`
  flex: 1;
`;

export const StyledModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;
