import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  padding: 100px 20px;
  background-color: #fff;
`;

export const HeaderTitle = styled.Text`
  margin-bottom: 30px;
  font-size: 32px;
`;

export const InputFormContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 40px;
`;

export const Input = styled.TextInput`
  width: 70%;
  height: 40px;
  margin-right: 15px;
  padding-left: 15px;
  border: 1px solid #5e5e5e;
  border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
  padding: 11px 18px;
  border-radius: 5px;
  background-color: #5e5e5e;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
`;

export const BorderLine = styled.View`
  margin-bottom: 20px;
  border-bottom-width: 0.5px;
`;

export const ContentTitle = styled.Text`
  margin-bottom: 15px;
  font-size: 20px;
`;
