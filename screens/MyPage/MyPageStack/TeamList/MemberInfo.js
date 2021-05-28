import React from 'react';

const MemberInfo = ({memberInfo}) => {
  return (
    <>
      {' '}
      {memberInfo.nickname}
      {' ( '}
      {memberInfo.gender === 'MALE' ? '남' : '여'}
      {', '}
      {memberInfo.age}
      {', '}
      {memberInfo.department}
      {' )'}
    </>
  );
};

export default MemberInfo;
