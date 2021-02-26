import React from 'react';
import ReceivedMatchingListItemScreen from './ReceivedMatchingListItemScreen';

const ReceivedMatchingList = ({receivedMatchingList}) => {
  return receivedMatchingList.map((list, index) => (
    <ReceivedMatchingListItemScreen receivedMatchingList={list} key={index} />
  ));
};

export default ReceivedMatchingList;
