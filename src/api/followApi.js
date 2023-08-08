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
