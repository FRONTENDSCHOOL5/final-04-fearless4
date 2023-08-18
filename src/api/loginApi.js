import axios from 'axios';
import { instance } from './axiosInstance';

export const postLogin = async (data) => {
	try {
		const res = await instance.post('/user/login', data);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
