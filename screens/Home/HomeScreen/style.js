import styled from '@emotion/native';

export const Wrapper = styled.View`
  flex: 1;
`;

export const WrapperInner = styled.View`
  padding: 0 20px;
`;

export const Header = styled.View`
  margin: 20px 0;
  padding: 0 20px 20px;
  background-color: #fff;
  border-radius: 10px;
  elevation: 4; //android
  shadow-color: #000; //ios
  shadow-opacity: 0.3;
  shadow-offset: 2px 2px;
`;

export const Result = styled.View`
  height: 35px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Search = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #cccccc;
`;

export const Filter = styled.View`
  margin: 10px 0 0;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  height: 40px;
`;

export const FlatList = styled.FlatList`
  background-color: #fafafa;
`;
