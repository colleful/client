import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from '@emotion/native';

const Wrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.5;
  background-color: gray;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const LoadingScreen = () => {
  return (
    <Wrapper>
      <ActivityIndicator size="large" color="#0000ff" />
    </Wrapper>
  );
};

export default LoadingScreen;
