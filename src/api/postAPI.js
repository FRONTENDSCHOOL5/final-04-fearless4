import { accessInstance } from './axiosInstance';

export const getPostData = (postId) => {
	return accessInstance.get(`/post/${postId}`);
};

export const getUserPosts = async (accountname) => {
	try {
		const response = await accessInstance.get(`/post/${accountname}/userpost`);
		return response.data;
	} catch (error) {
		console.error('게시물을 가져오는데 실패했습니다.', error);
		throw error;
	}
};

export const createPost = (postData) => {
	return accessInstance.post('/post', postData);
};

export const updatePost = (postId, postData) => {
	return accessInstance.put(`/post/${postId}`, postData);
};

export const deletePost = (postId) => {
	return accessInstance.delete(`/post/${postId}`);
};

export const addHeartToPost = (postId) => {
	return accessInstance.post(`/post/${postId}/heart`);
};

export const removeHeartFromPost = (postId) => {
	return accessInstance.delete(`/post/${postId}/unheart`);
};
