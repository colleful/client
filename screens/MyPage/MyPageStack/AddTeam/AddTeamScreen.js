import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {trigger} from 'swr';
import {Config} from '../../../../Config';
import {css} from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';
import {CREATE_TEAM_REQUEST, INITAILIZE_STATE} from '../../../../reducers/team';
import LoadingScreen from '../../../../components/LoadingScreen';

const AddTeamScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState('');
  const {createTeamLoading, createTeamDone, createTeamError} = useSelector(
    ({team}) => team,
  );

  useEffect(() => {
    return () => {
      dispatch({type: INITAILIZE_STATE});
    };
  }, []);

  useEffect(() => {
    if (createTeamDone) {
      Alert.alert(
        '완료',
        '팀 생성이 완료되었습니다. 이어서 팀 초대를 하시겠습니까? ( 나중에 팀목록 -> 팀초대로 팀을 초대할 수 있습니다 )',
        [
          {
            text: '팀 초대',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/users`);
              navigation.navigate('팀초대');
            },
          },
          {
            text: '나가기',
            onPress: () => {
              trigger(`${Config.baseUrl}/api/users`);
              navigation.navigate('유저정보');
            },
          },
        ],
      );
    }
    if (createTeamError) {
      Alert.alert('에러', `${createTeamError.response.data.message}`, [
        {
          text: '확인',
        },
      ]);
      console.log({createTeamError});
    }
  }, [createTeamDone, createTeamError]);

  const onCreateTeam = useCallback(() => {
    if (!teamName || !teamName.trim()) {
      Alert.alert('팀생성 오류', '팀명은 최소 한 글자 이상 이여야 합니다.', [
        {
          text: '확인',
        },
      ]);
      return;
    }
    dispatch({type: CREATE_TEAM_REQUEST, data: {teamName: teamName}});
  }, [dispatch, teamName]);

  return (
    <View
      style={css`
        flex: 1;
        justify-content: center;
        align-items: center;
      `}>
      <Text
        style={css`
          font-size: 25px;
          margin-bottom: 15px;
        `}>
        팀 이름을 입력해주세요
      </Text>
      <TextInput
        onChangeText={(text) => setTeamName(text)}
        style={css`
          width: 150px;
          height: 50px;
          border-bottom-width: 1px;
          margin-bottom: 15px;
          font-size: 16px;
        `}
      />

      <TouchableOpacity
        onPress={onCreateTeam}
        style={css`
          background-color: #5e5e5e;
          border-radius: 5px;
          padding: 13px 18px;
          margin-vertical: 20px;
          width: 70px;
        `}>
        <Text
          style={css`
            color: white;
            text-align: center;
          `}>
          생성
        </Text>
      </TouchableOpacity>
      {createTeamLoading && <LoadingScreen />}
    </View>
  );
};

export default AddTeamScreen;
