import { accessInstance } from './axiosInstance';

export const getFollow = async (accountname, pageParam, follow) => {
	try {
		const res = await accessInstance.get(
			`/profile/${accountname}/${follow}/?limit=10&skip=${pageParam}`
		);
		const { data } = res;
		return {
			data: data,
			nextPage: pageParam,
		};
	} catch (error) {
		console.log(error);
	}
};
