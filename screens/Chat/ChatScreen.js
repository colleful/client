import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {css} from '@emotion/native';

import AsyncStorage from '@react-native-community/async-storage';
import useSWR from 'swr';
import axios from 'axios';
import {Config} from '../../Config';
import {Gravatar} from 'react-native-gravatar';
import GetTimeFromNow from '../../utils/GetTimeFromNow';

const ChatScreen = ({userData}) => {
  const textBoxWidth = Dimensions.get('window').width - 100;

  const fetcher = async (url) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    });
    return {...response.data};
  };

  const {data: teamInfo = {}, error} = useSWR(
    userData.teamId === null
      ? null
      : `${Config.baseUrl}/api/teams/${userData.teamId}`,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
        if (error) console.log({error});
      },
    },
  );

  if (!teamInfo) return <Text>Loading..</Text>;

  return (
    <View
      style={css`
        flex: 1;
        background-color: #fafafa;
      `}>
      <View
        style={css`
          flex: 0.075;
          justify-content: center;
          padding-left: 10px;
          border-bottom-width: 1px;
          border-bottom-color: #f0f0f0;
        `}>
        <Text
          style={css`
            font-size: 17px;
          `}>
          채팅
        </Text>
      </View>
      <View
        style={css`
          flex: 0.925;
        `}>
        {teamInfo && teamInfo.matchedTeamId ? (
          <>
            <View
              style={css`
                flex: 0.15;
                background-color: #fff;
                flex-direction: row;
                align-items: center;
                padding-left: 15px;
              `}>
              <Gravatar
                options={{
                  email: teamInfo.teamName + "@naver.com",
                  parameters: {s: '50', d: 'retro'},
                  secure: true,
                }}
                style={{borderRadius: 30, width: 50, height: 50}}
              />
              <View
                style={css`
                  margin: 0 15px;
                  width: ${textBoxWidth + `px`};
                `}>
                <View
                  style={css`
                    flex-direction: row;
                  `}>
                  <Text
                    style={css`
                      margin-bottom: 10px;
                    `}>
                    Colleful
                  </Text>
                  <Text
                    style={css`
                      font-size: 14px;
                      color: #c4c4c4;
                      font-weight: 100;
                      margin-left: 5px;
                    `}>
                    {/* {GetTimeFromNow(teamInfo.updatedAt)}{' '} */}
                    {/* 채팅관련 api 나오면 updatedAt 바꾸기 */}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={css`
                    font-weight: 100;
                  `}>
                  매칭된 팀과 대화를 시작해보세요! 상대 방과 대화하기 전
                  가이드를 꼭 읽어보세요.
                </Text>
              </View>
            </View>
            <View
              style={css`
                border-bottom-width: 1px;
                border-bottom-color: #f0f0f0;
              `}
            />
          </>
        ) : (
          <View style={css`padding: 10px;`}>
            <Text>아직 매칭된 팀이 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatScreen;
