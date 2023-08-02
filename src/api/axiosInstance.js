import axios from 'axios';

export const API_URL = 'https://api.mandarin.weniv.co.kr';

// 로그인용 인스턴스
export const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

// 이미지용 인스턴스
export const imgInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'multipart/form-data',
	},
});

// token이 필요할 때 쓰는 인스턴스
export const accessInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
	},
});

// 요청 인터셉터 추가, 요청 보내기전에 token을 넣음
accessInstance.interceptors.request.use((config) => {
	if (!config.headers.Authorization) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		};
	}
	return config;
});
