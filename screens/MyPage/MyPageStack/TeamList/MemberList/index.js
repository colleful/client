import React from 'react';
import MemberInfo from '../MemberInfo/index';

const MemberList = ({teamMember}) => {
  return teamMember?.map((member, index) => (
    <MemberInfo memberInfo={member} key={index} index={index} />
  ));
};

export default MemberList;
