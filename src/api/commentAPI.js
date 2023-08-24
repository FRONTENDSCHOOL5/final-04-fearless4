import { accessInstance } from './axiosInstance';

export const getCommentList = async (postId) => {
	try {
		const response = await accessInstance.get(
			`/post/${postId}/comments/?limit=infinity`
		);
		const sortedComments = response.data.comments.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
		return sortedComments;
	} catch (error) {
		console.log('오류 발생', error.response || error);
		throw error;
	}
};

export const deleteComment = async ({ postId, commentId }) => {
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
