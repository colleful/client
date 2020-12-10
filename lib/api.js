import axios from 'axios';
import {Config} from '../Config';

// 학과 정보 관련
export const getDepartment = () =>
  axios.get(`${Config.baseUrl}/api/departments`);

// user 관련
export const getMyInfo = (header) =>
  axios.get(`${Config.baseUrl}/api/users`, header);

export const getUserInfo = (id, header) =>
  axios.get(`${Config.baseUrl}/api/users/${id}`, header);

export const deleteUser = (header) =>
  axios.delete(`${Config.baseUrl}/api/users`, header);

export const changeUserInfo = (body, header) =>
  axios.patch(`${Config.baseUrl}/api/users`, body, header);

export const changeUserPassword = (body, header) =>
  axios.patch(`${Config.baseUrl}/api/users/password`, body, header);

export const searchUserByNickname = (nickname, header) =>
  axios.get(`${Config.baseUrl}/api/users/nickname/${nickname}`, header);

// Team 관련
export const getReadyTeam = (pageNumber,header) =>
  axios.get(`${Config.baseUrl}/api/teams?page=${pageNumber}`, header);

export const changeTeamStatus = (id, body, header) =>
  axios.patch(`${Config.baseUrl}/api/teams/${id}`, body, header);

export const createTeam = (body, header) =>
  axios.post(`${Config.baseUrl}/api/teams`, body, header);

export const exitTeam = (id, header) =>
  axios.delete(`${Config.baseUrl}/api/teams/${id}/members`, header);

export const deleteTeam = (id, header) =>
  axios.delete(`${Config.baseUrl}/api/teams/${id}`, header);

// 팀 초대 관련
export const inviteTeam = (teamId, userId, header) =>
  axios.post(
    `${Config.baseUrl}/api/invitations/${teamId}/${userId}`,
    {},
    header,
  );

export const getInvitationList = (header) =>
  axios.get(`${Config.baseUrl}/api/invitations`, header);

export const acceptInvitation = (invitationId, header) =>
  axios.delete(
    `${Config.baseUrl}/api/invitations/${invitationId}/accept`,
    header,
  );

export const refusalInvitation = (invitationId, header) =>
  axios.delete(
    `${Config.baseUrl}/api/invitations/${invitationId}/refuse`,
    header,
  );
  
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
