import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 40px;
`;

export const WrapperInner = styled.View`
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const Header = styled.View`
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 0.25px solid gray;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  padding: 12px 18px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
`;
