import axios from 'axios';
import {Config} from '../Config';

// user 관련
export const getMyInfo = (header) =>
  axios.get(`${Config.baseUrl}/api/users`, header);

export const getUserInfo = (id, header) =>
  axios.get(`${Config.baseUrl}/api/users/${id}`, header);

export const deleteUser = (header) =>
  axios.delete(`${Config.baseUrl}/api/users`, header);

// Team 관련
export const createTeam = (body, header) =>
  axios.post(`${Config.baseUrl}/api/teams`, body, header);

export const deleteTeam = (id, header) =>
  axios.delete(`${Config.baseUrl}/api/teams/${id}`, header);

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
