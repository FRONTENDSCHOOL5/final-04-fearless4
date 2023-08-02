import { accessInstance } from './axiosInstance';

export const getUserInfo = async (accountname) => {
	try {
		const res = await accessInstance.get(`/profile/${accountname}`);
		return res.data.profile;
	} catch (error) {
		console.error(error);
	}
};

export const postFollow = async (accountname) => {
	try {
		const res = await accessInstance.post(`/profile/${accountname}/follow`);
	} catch (error) {
		console.error(error);
	}
};

export const delUnFollow = async (accountname) => {
	try {
		const res = await accessInstance.delete(`/profile/${accountname}/unfollow`);
	} catch (error) {
		console.error(error);
	}
};
