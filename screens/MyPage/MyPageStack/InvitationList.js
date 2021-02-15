import React from 'react';
import InvitationListItemScreen from './InvitationListItemScreen';

const InvitationList = ({receivedInvitationList}) => {
  return receivedInvitationList.map((list, index) => (
    <InvitationListItemScreen receivedInvitationList={list} key={index} />
  ));
};

export default InvitationList;
