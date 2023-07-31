import { accessInstance } from './axiosInstance';

export const getUserInfo = async (accountname) => {
	try {
		const res = await accessInstance.get(`/profile/${accountname}`);
		return res.data.profile;
	} catch (error) {
		console.error(error);
	}
};
