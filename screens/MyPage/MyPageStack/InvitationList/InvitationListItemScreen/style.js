import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: #e5e5e5;
`;

export const Content = styled.Text`
  font-size: 16px;
  margin-right: 15px;
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
