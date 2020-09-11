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

export const sendAuthEmail = ({email}) =>
  axios.post(`${Config.baseUrl}/auth/email`, {email});

export const confirmAuthEmail = ({email, code}) =>
  axios.patch(`${Config.baseUrl}/auth/check`, {email, code});

export const login = ({email, password}) =>
  axios.post(`${Config.baseUrl}/auth/login`, {email, password});
