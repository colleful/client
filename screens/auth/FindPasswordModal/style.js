import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WrapperInner = styled.View`
  width: 250px;
  border-radius: 5px;
  background-color: white;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  height: 50px;
  border-bottom-width: 0.5px;
  border-color: gray;
`;

export const Title = styled.Text`
  font-size: ${(props) => (props.f18 ? '18px' : '12px')};
`;

export const Content = styled.View`
  padding: 20px 20px 10px;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: ${(props) => (props.mb10 ? '10px' : '5px')};
  opacity: 0.5;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  border-radius: 5px;
  background-color: #5e5e5e;
  padding: 12px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
`;

export const ExitButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: flex-end;
  height: 30px;
  padding: 5px;
`;
