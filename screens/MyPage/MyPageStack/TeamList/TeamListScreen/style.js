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
  ${(props) => props.mb5 && 'margin-bottom: 5px'};
  font-size: 19px;
  color: #2e89de;
  line-height: 26px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 500;
`;

export const BorderLine = styled.View`
  margin: 15px 0;
  border-bottom-width: 1px;
`;

export const ContentText = styled.Text`
  font-size: 20px;
`;
