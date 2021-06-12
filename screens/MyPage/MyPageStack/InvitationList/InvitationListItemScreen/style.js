import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 10px;
  background-color: #e5e5e5;
`;

export const Content = styled.Text`
  margin-right: 15px;
  font-size: 16px;
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
