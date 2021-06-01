import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
  padding: 50px 40px;
  background-color: #fff;
`;

export const ExplainContainer = styled.View`
  margin-bottom: 30px;
`;

export const ExplainText = styled.Text`
  font-size: 19px;
  color: #2e89de;
  line-height: 26px;
  ${(props) => props.mb5 && 'margin-bottom: 5px'};
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 500;
`;

export const BorderLine = styled.View`
  border-bottom-width: 1px;
  margin: 15px 0;
`;

export const ContentText = styled.Text`
  font-size: 20px;
`;
