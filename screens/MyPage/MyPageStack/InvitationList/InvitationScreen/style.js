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
  width: 100%;
  flex-direction: row;
  margin-bottom: 40px;
`;

export const Input = styled.TextInput`
  width: 70%;
  margin-right: 15px;
  padding-left: 15px;
  height: 40px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #5e5e5e;
`;

export const Button = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  padding: 11px 18px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
`;

export const BorderLine = styled.View`
  border-bottom-width: 0.5px;
  margin-bottom: 20px;
`;

export const ContentTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
`;
