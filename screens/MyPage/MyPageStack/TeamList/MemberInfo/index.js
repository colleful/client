import React from 'react';

const MemberInfo = ({memberInfo, index}) => {
  return (
    <>
      {index != 0 && ','} {memberInfo.nickname}
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
