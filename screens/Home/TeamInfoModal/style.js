import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const WrapperInner = styled.View`
  margin: 40px 10px;
  border-radius: 10px;
  background-color: white;
`;
export const TeamInfoContainer = styled.View`
  flex: 0.85;
  flex-flow: row wrap;
  width: 300px;
  align-items: stretch;
`;

export const ButtonContainer = styled.View`
  flex: 0.15;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 12px 16px;
  border-radius: 5px;
  background-color: #5e5e5e;
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: #fff;
`;
