import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 40px;
`;

export const WrapperInner = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: white;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
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
  padding: 12px 18px;
  border-radius: 5px;
  background-color: #5e5e5e;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
`;
