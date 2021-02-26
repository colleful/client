import React from 'react';
import SentMatchingListItemScreen from './SentMatchingListItemScreen';

const SentMatchingList = ({sentMatchingList}) => {
  return sentMatchingList.map((list, index) => (
    <SentMatchingListItemScreen sentMatchingList={list} key={index} />
  ));
};

export default SentMatchingList;