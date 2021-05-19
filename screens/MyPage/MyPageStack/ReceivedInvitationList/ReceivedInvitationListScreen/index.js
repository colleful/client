import React from 'react';
import ReceivedInvitationListItemScreen from '../ReceivedInvitationListItemScreen/index';

const ReceivedInvitationListScreen = ({receivedInvitationList}) => {
  return receivedInvitationList.map((list, index) => (
    <ReceivedInvitationListItemScreen receivedInvitationList={list} key={index} />
  ));
};

export default ReceivedInvitationListScreen;
