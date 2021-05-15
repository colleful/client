import styled from '@emotion/native';

export const Wrapper = styled.ScrollView`
  flex: 1;
`;

export const Inner = styled.View`
  padding: 20px;
`;

export const Header = styled.Text`
  font-size: 32px;
  margin-bottom: 30px;
`;

export const AccountForm_container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const AccountForm_buttonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 30px 0;
`;

export const Button__dark__width100__marginVertical20 = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 20px 0;
  width: 100%;
`;

export const Button__dark__width100 = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  padding: 10px 20px;
  width: 100%;
`;

export const Button__dark = styled.TouchableOpacity`
  background-color: #5e5e5e;
  border-radius: 5px;
  padding: 10px 20px;
`;
