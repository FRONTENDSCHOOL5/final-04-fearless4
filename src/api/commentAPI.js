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

export const uploadComment = async (postId, commentContent) => {
	try {
		const response = await accessInstance.post(`/post/${postId}/comments`, {
			comment: {
				content: commentContent,
			},
		});
		return response.data;
	} catch (error) {
		console.error('댓글을 업로드하지 못했습니다!', error.response);
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
