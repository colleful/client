import React from 'react';
import InvitationListItemScreen from '../InvitationListItemScreen/index';

const InvitationListScreen = ({searchUserInfos}) => {
  return searchUserInfos?.map((searchUserInfo, index) => (
    <InvitationListItemScreen searchUserInfo={searchUserInfo} key={index} />
  ));
};

export default InvitationListScreen;
