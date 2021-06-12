import styled from '@emotion/native';
import {Gravatar} from 'react-native-gravatar';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fafafa;
`;
export const StyledGravatar = styled(Gravatar)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const WrapperInner = styled.View`
  flex-direction: row;
  padding: 20px;
  border: 0.5px solid #f0f0f0;
  background-color: #fff;
`;
export const ContentContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
`;
export const ButtonContainer = styled.View`
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  padding: 8px 13px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
`;
