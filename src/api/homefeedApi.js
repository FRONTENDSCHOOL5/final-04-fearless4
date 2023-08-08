import { accessInstance } from './axiosInstance';

const getHomefeed = async (pageParam) => {
	const res = await accessInstance.get(
		`/post/feed/?limit=10&skip=${pageParam}`
	);
	const { posts } = res.data;

	return {
		data: posts,
		nextPage: pageParam,
		isLast: posts.length % 10 !== 0,
	};
};

export default getHomefeed;
