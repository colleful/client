import styled from '@emotion/native';
import {Gravatar} from 'react-native-gravatar';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fafafa;
`;
export const StyledGravatar = styled(Gravatar)`
  border-radius: 30px;
  width: 60px;
  height: 60px;
`;

export const WrapperInner = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  background-color: #fff;
  border-bottom-color: #f0f0f0;
  padding: 20px;
`;
export const ContentContainer = styled.View`
  flex: 1;
  margin-left: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
export const ButtonContainer = styled.View`
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 8px 13px;
`;
