import { accessInstance } from './axiosInstance';

const getSearchdata = async (keyword) => {
	const res = await accessInstance.get(`/user/searchuser/?keyword=${keyword}`);

	return res.data;
};

export default getSearchdata;
