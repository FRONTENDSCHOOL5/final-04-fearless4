import { instance } from './axiosInstance';

export const postSignup = async (data) => {
	try {
		const res = await instance.post(`/user/emailvalid`, data);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const postProfileSetup = async (data) => {
	try {
		const res = await instance.post(`/user`, data);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
