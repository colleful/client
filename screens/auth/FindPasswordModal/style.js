import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalForm = styled.View`
  background-color: white;
  width: 250px;
  border-radius: 5px;
`;

export const ModalForm_title = styled.View`
  height: 50px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 0.5px;
  border-color: gray;
`;

export const ModalForm_title__fontSize18 = styled.Text`
  font-size: 18px;
`;

export const ModalForm_title__fontSize12 = styled.Text`
  font-size: 12px;
`;

export const ModalForm_content = styled.View`
  padding: 20px 20px 10px;
`;

export const ModalForm_input = styled.TextInput`
  border: 1px solid gray;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 5px;
  opacity: 0.5;
`;

export const ModalForm_button = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  padding: 12px;
`;

export const ModalForm_buttonText = styled.Text`
  color: white;
  text-align: center;
`;

export const ModalForm_exitButton = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: center;
  height: 30px;
  padding: 5px;
`;
