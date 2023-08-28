import { accessInstance } from './axiosInstance';

export const getPostData = (postId) => {
	return accessInstance.get(`/post/${postId}`);
};

export const getUserPosts = (accountname) => {
	return accessInstance.get(`/post/${accountname}/userpost`);
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
