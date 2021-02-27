import React from 'react';
import ReceivedInvitationListItemScreen from './ReceivedInvitationListItemScreen';

const ReceivedInvitationList = ({receivedInvitationList}) => {
  return receivedInvitationList.map((list, index) => (
    <ReceivedInvitationListItemScreen receivedInvitationList={list} key={index} />
  ));
};

export default ReceivedInvitationList;
