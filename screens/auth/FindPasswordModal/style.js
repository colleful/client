import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WrapperInner = styled.View`
  background-color: white;
  width: 250px;
  border-radius: 5px;
`;

export const Header = styled.View`
  height: 50px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 0.5px;
  border-color: gray;
`;

export const Title = styled.Text`
  font-size: ${(props) => (props.large ? '18px' : '12px')};
`;
// large: 18px , small: 12px;

export const Content = styled.View`
  padding: 20px 20px 10px;
`;

export const Input = styled.TextInput`
  border: 1px solid gray;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 5px;
  opacity: 0.5;
`;

export const Button = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  padding: 12px;
`;

export const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;

export const ExitButton = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: center;
  height: 30px;
  padding: 5px;
`;
