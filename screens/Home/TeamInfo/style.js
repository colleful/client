import styled from '@emotion/native';

export const Wrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 18px 0px;
`;

export const WrapperInner = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
`;

export const Content = styled.Text`
  font-size: 15px;
  margin-left: 25px;
  line-height: 21px;
`;

export const UpdatedAtText = styled.Text`
  font-size: 14px;
  color: #c4c4c4;
  font-weight: 100;
`;
