import axios from 'axios';
import {Config} from '../Config';
import AsyncStorage from '@react-native-community/async-storage';

// 학과 정보 관련
export const getDepartment = () =>
  axios.get(`${Config.baseUrl}/api/departments`);

// user 관련
export const getMyInfo = (header) =>
  axios.get(`${Config.baseUrl}/api/users`, header);

export const getUserInfo = async (id) =>
  axios.get(`${Config.baseUrl}/api/users/${id}`, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

export const deleteUser = (header) =>
  axios.delete(`${Config.baseUrl}/api/users`, header);

export const changeUserInfo = (body, header) =>
  axios.patch(`${Config.baseUrl}/api/users`, body, header);

export const changeUserPassword = (body, header) =>
  axios.patch(`${Config.baseUrl}/api/users/password`, body, header);

export const searchUserByNickname = async (nickname) =>
  axios.get(`${Config.baseUrl}/api/users/nickname/${nickname}`, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

// 팀 관련
export const getTeamInfo = (id, header) =>
  axios.get(`${Config.baseUrl}/api/teams/${id}`, header);

export const getTeamMemberInfo = (id, header) =>
  axios.get(`${Config.baseUrl}/api/teams/${id}/members`, header);

export const getReadyTeam = (pageNumber, header) =>
  axios.get(`${Config.baseUrl}/api/teams?page=${pageNumber}`, header);

export const changeTeamStatusToReady = async () =>
  axios.patch(
    `${Config.baseUrl}/api/teams/ready`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const changeTeamStatusToWatching = async () =>
  axios.patch(
    `${Config.baseUrl}/api/teams/watching`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const finishTeamMatching = async () =>
  axios.post(
    `${Config.baseUrl}/api/teams/finish-match`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const createTeam = async (body) =>
  axios.post(`${Config.baseUrl}/api/teams`, body, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

export const exitTeam = async (body) =>
  axios.post(`${Config.baseUrl}/api/teams/leave`, body, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

export const deleteTeam = async () =>
  axios.delete(`${Config.baseUrl}/api/teams`, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

// 초대 관련
export const getSentInvitationList = (header) =>
  axios.get(`${Config.baseUrl}/api/invitations/sent`, header);

export const getReceivedInvitationList = (header) =>
  axios.get(`${Config.baseUrl}/api/invitations/received`, header);

export const inviteTeam = async (body) =>
  axios.post(`${Config.baseUrl}/api/invitations`, body, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

export const acceptInvitation = async (id) =>
  axios.post(
    `${Config.baseUrl}/api/invitations/${id}/accept`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const refuseInvitation = async (id) =>
  axios.post(
    `${Config.baseUrl}/api/invitations/${id}/refuse`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const deleteInvitation = async (id) =>
  axios.delete(`${Config.baseUrl}/api/invitations/${id}`, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

// 매칭 관련
export const getSentMatching = (header) =>
  axios.get(`${Config.baseUrl}/api/matching/sent`, header);

export const getReceivedMatching = (header) =>
  axios.get(`${Config.baseUrl}/api/matching/received`, header);

export const sendMatching = async (body) =>
  axios.post(`${Config.baseUrl}/api/matching`, body, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

export const acceptMatching = async (id) =>
  axios.post(
    `${Config.baseUrl}/api/matching/${id}/accept`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const refuseMatching = async (id) =>
  axios.post(
    `${Config.baseUrl}/api/matching/${id}/refuse`,
    {},
    {
      headers: {
        Authorization: await AsyncStorage.getItem('authorization'),
      },
    },
  );

export const deleteMatching = async (id) =>
  axios.delete(`${Config.baseUrl}/api/matching/${id}`, {
    headers: {
      Authorization: await AsyncStorage.getItem('authorization'),
    },
  });

// auth 관련
export const register = ({
  email,
  password,
  nickname,
  birthYear,
  gender,
  departmentId,
  selfIntroduction,
}) =>
  axios.post(`${Config.baseUrl}/auth/join`, {
    email,
    password,
    nickname,
    birthYear,
    gender,
    departmentId,
    selfIntroduction,
  });

export const login = ({email, password}) =>
  axios.post(`${Config.baseUrl}/auth/login`, {email, password});

export const sendAuthEmail = ({email}) =>
  axios.post(`${Config.baseUrl}/auth/join/email`, {email});

export const sendAuthEmailForPasswordChange = ({email}) =>
  axios.post(`${Config.baseUrl}/auth/password/email`, {email});

export const changePassword = ({email, password}) =>
  axios.patch(`${Config.baseUrl}/auth/password`, {email, password});

export const confirmAuthEmail = ({email, code}) =>
  axios.patch(`${Config.baseUrl}/auth/check`, {email, code});
