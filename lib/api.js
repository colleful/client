import axios from 'axios';
import {Config} from '../Config';

export const getTeam = () => axios.get(`${Config.baseUrl}/users`);

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
