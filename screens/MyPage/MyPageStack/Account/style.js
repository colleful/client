import styled from '@emotion/native';

export const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

export const WrapperInner = styled.View`
  padding: 20px;
`;

export const Header = styled.Text`
  margin-bottom: 30px;
  font-size: 32px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: #fff;
`;

export const InputContainer = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  font-size: 32px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 30px 0;
`;

export const Button = styled.TouchableOpacity`
  ${(props) => props.md12 && 'width: 100%'};
  ${(props) => props.mv20 && 'margin: 20px 0'};
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #5e5e5e;
`;

export const BorderLine = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border: 0.3px solid gray;
`;
