import { accessInstance } from './axiosInstance';

export const getFollow = async (accountname, pageParam, follow, nextPage) => {
	try {
		const res = await accessInstance.get(
			`/profile/${accountname}/${follow}/?limit=10&skip=${pageParam}`
		);
		const { data } = res;
		data.length >= 10 ? nextPage(true) : nextPage(false);

		return {
			data: data,
			nextPage: pageParam,
		};
	} catch (error) {
		console.log(error);
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
