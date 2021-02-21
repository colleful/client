import React from 'react';
import SentInvitationListItemScreen from './SentInvitationListItemScreen';

const SentInvitationList = ({sentInvitationList}) => {
  return sentInvitationList.map((list, index) => (
    <SentInvitationListItemScreen sentInvitationList={list} key={index} />
  ));
};

export default SentInvitationList;