import React from 'react';

const MemberInfo = ({memberInfo, index}) => (
  <>
    {index !== 0 && ','} {memberInfo.nickname}
  </>
);

export default MemberInfo;
