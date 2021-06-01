import styled from '@emotion/native';

export const Wrapper = styled.ScrollView`
  flex: 1;
`;

export const WrapperInner = styled.View`
  padding: 20px;
`;

export const Header = styled.Text`
  font-size: 32px;
  margin-bottom: 30px;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 30px 0;
`;

export const Button = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  padding: 10px 20px;
  ${(props) => props.mv20 && 'margin: 20px 0'};
  ${(props) => props.md12 && 'width: 100%'};
`;

export const BorderLine = styled.View`
  width: 100%;
  border: 0.3px solid gray;
  margin-bottom: 20px;
`;
