import { accessInstance, instance } from './axiosInstance';

export const getUserInfo = async (accountname) => {
	try {
		const res = await accessInstance.get(`/profile/${accountname}`);
		console.log(res.data.profile);
		return res.data.profile;
	} catch (error) {
		console.error(error);
	}
};

export const getMyInfo = async () => {
	try {
		const res = await accessInstance.get('/user/myinfo');
		console.log(res.data.user);
		return res.data.user;
	} catch (error) {
		console.error(error);
	}
};

export const postFollow = async (accountname) => {
	try {
		const res = await accessInstance.post(`/profile/${accountname}/follow`);
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};

export const delUnFollow = async (accountname) => {
	try {
		const res = await accessInstance.delete(`/profile/${accountname}/unfollow`);
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};

export const postAccountValid = async (accountname) => {
	try {
		const res = await instance.post(`/user/accountnamevalid/`, {
			user: {
				accountname: accountname,
			},
		});
		return res.data.message;
	} catch (error) {
		console.error(error);
	}
};

export const putProfileEdit = async (accountname) => {
	try {
		const res = await accessInstance.put('/user/', accountname);
	} catch (error) {
		console.error('에러입니다.', error);
	}
};
