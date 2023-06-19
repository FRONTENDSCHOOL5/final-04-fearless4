import React from 'react';
import API_URL from '../api';
import { useState } from 'react';

export default function useMyProfile() {
	const url = API_URL;
	const token = localStorage.getItem('token');
	const [userData, setUserData] = useState();

	try {
		if (!userData) {
			(async () => {
				const res = await axios({
					method: 'GET',
					url: `${url}/user/myinfo`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUserData(res.data.user);
			})();
		}
	} catch (error) {
		console.log('에러입니다.', error);
	}

	return userData;
}
