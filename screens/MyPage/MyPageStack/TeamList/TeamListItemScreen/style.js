import styled from '@emotion/native';

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  margin-right: ${(props) => props.mr20 && '20px'};
  padding: 15px;
  border-radius: 5px;
  background-color: #5e5e5e;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
  text-align: center;
`;

export const BorderLine = styled.View`
  margin: 15px 0;
  border-bottom-width: 1px;
`;

export const Content = styled.Text`
  font-size: 19px;
  line-height: 30px;
`;
