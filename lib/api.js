import axios from 'axios';
import {Config} from '../Config';

export const getTeam = () => axios.get(`${Config.baseUrl}/users`)