import { accessInstance } from './axiosInstance';

/**
 * 게시글 데이터를 불러오는 함수
 * @param {string} postId - 불러올 게시글의 ID
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */

export const getPostData = (postId) => {
	return accessInstance.get(`/post/${postId}`);
};

/**
 * 사용자의 게시글 목록을 불러오는 함수
 * @param {string} accountname - 게시글 목록을 불러올 사용자명
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */
export const getUserPosts = (accountname) => {
	return accessInstance.get(`/post/${accountname}/userpost`);
};

/**
 * 게시글을 작성하는 함수
 * @param {object} postData - 작성할 게시글의 데이터
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */
export const createPost = (postData) => {
	return accessInstance.post('/post', postData);
};

/**
 * 게시글을 수정하는 함수
 * @param {string} postId - 수정할 게시글의 ID
 * @param {object} postData - 수정할 게시글의 데이터
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */
export const updatePost = (postId, postData) => {
	return accessInstance.put(`/post/${postId}`, postData);
};

/**
 * 게시글을 삭제하는 함수
 * @param {string} postId - 삭제할 게시글의 ID
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */
export const deletePost = (postId) => {
	return accessInstance.delete(`/post/${postId}`);
};

/**
 * 게시글에 좋아요를 추가하는 함수
 * @param {string} postId - 좋아요를 추가할 게시글의 ID
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */
export const addHeartToPost = (postId) => {
	return accessInstance.post(`/post/${postId}/heart`);
};

/**
 * 게시글의 좋아요를 제거하는 함수
 * @param {string} postId - 좋아요를 제거할 게시글의 ID
 * @returns {Promise} - axios 응답 객체를 반환하는 Promise
 */
export const removeHeartFromPost = (postId) => {
	return accessInstance.delete(`/post/${postId}/unheart`);
};
