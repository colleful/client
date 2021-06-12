import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  padding: 100px 25px 0;
  background-color: #fff;
`;

export const HeaderTitle = styled.Text`
  font-size: 36px;
`;

export const BorderLine = styled.View`
  margin: 20px 0;
  border-bottom-width: 1px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  margin-right: 20px;
  padding: 10px 18px;
  border-radius: 5px;
  background-color: #5e5e5e;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
`;

export const Content = styled.Text`
  font-size: 19px;
  line-height: 30px;
`;
