import styled from '@emotion/native';
import {Gravatar} from 'react-native-gravatar';

export const Wrapper = styled.View`
  width: 50%;
  height: 50%;
  padding: 20px;
`;
export const CardContainer = styled.View`
  flex: 1;
`;

export const BorderLine = styled.View`
  width: 100px;
  border: 3px solid #fff;
`;

export const StyledGravatar = styled(Gravatar)`
  width: 110px;
  height: 110px;
  border-radius: 10px;
`;
