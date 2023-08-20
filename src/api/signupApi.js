import { instance } from './axiosInstance';

const postSignup = async (data) => {
	const res = await instance.post(`/user/emailvalid`, data);

	return res.data;
};

export default postSignup;
