import React from 'react';

const MemberInfo = ({memberInfo, index}) => {
  return (
    <>
      {memberInfo.nickname} {index != 0 && ', '}
      {/* {' ( '}
      {memberInfo.gender === 'MALE' ? '남' : '여'}
      {', '}
      {memberInfo.age}
      {', '}
      {memberInfo.department}
      {' )'} */}
    </>
  );
};

export default MemberInfo;
