import React from 'react';
import TeamListItem from './TeamListItem';

const TeamListItemScreen = ({
  navigation,
  teamInfo,
  userId,
}) => {
  return teamInfo && teamInfo.map((team, index) => (
    <TeamListItem
      navigation={navigation}
      teamInfo={team}
      userId={userId}
      key={index}
    />
  ));
};

export default React.memo(TeamListItemScreen);
