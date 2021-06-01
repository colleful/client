import React from 'react';
import SentInvitationListItemScreen from '../SentInvitationListItemScreen/index';

const SentInvitationList = ({sentInvitationList}) => {
  return sentInvitationList.map((list, index) => (
    <SentInvitationListItemScreen sentInvitationList={list} key={index} />
  ));
};

export default SentInvitationList;