import { accessInstance } from './axiosInstance';

export const deleteComment = async (postId, commentId) => {
	try {
		await accessInstance.delete(`/post/${postId}/comments/${commentId}`);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const reportComment = async (commentId) => {
	try {
		await accessInstance.post('/report', {
			commentId: commentId,
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};
