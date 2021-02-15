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

// 팀 관련
export const getTeamInfo = (id, header) =>
  axios.get(`${Config.baseUrl}/api/teams/${id}`, header);

export const getTeamMemberInfo = (id, header) =>
  axios.get(`${Config.baseUrl}/api/teams/${id}/members`, header);

export const getReadyTeam = (pageNumber, header) =>
  axios.get(`${Config.baseUrl}/api/teams?page=${pageNumber}`, header);

export const changeTeamStatus = (id, body, header) =>
  axios.patch(`${Config.baseUrl}/api/teams/${id}`, body, header);

export const createTeam = (body, header) =>
  axios.post(`${Config.baseUrl}/api/teams`, body, header);

export const exitTeam = (body, header) =>
  axios.post(`${Config.baseUrl}/api/teams/leave`, body, header);

export const deleteTeam = (header) =>
  axios.delete(`${Config.baseUrl}/api/teams`, header);

// 초대 관련

export const setInvitationList = (header) =>
  axios.get(`${Config.baseUrl}/api/invitations/sent`, header);

export const getInvitationList = (header) =>
  axios.get(`${Config.baseUrl}/api/invitations/received`, header);

export const inviteTeam = (body, header) =>
  axios.post(`${Config.baseUrl}/api/invitations`, body, header);

export const acceptInvitation = (id, body, header) =>
  axios.post(`${Config.baseUrl}/api/invitations/${id}/accept`, body, header);

export const refuseInvitation = (id, body, header) =>
  axios.post(`${Config.baseUrl}/api/invitations/${id}/refuse`, body, header);

export const cancelInvitation = (id, header) =>
  axios.delete(`${Config.baseUrl}/api/invitations/${id}`, header);

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
