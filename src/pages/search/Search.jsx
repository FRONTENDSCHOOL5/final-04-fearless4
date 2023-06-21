import React, { useState, useEffect } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import { SearchInput } from './search.style';
import { API_URL } from '../../api.js';
import axios from 'axios';

export default function Search() {
	const url = API_URL;
	const token = localStorage.getItem('token');
	const [inputSearch, setInputSearch] = useState('');

	const onChange = (event) => {
		setInputSearch(event.target.value);
	};

	useEffect(() => {
		const searchData = async () => {
			if (inputSearch.length > 0) {
				try {
					const res = await axios({
						method: 'GET',
						url: `${url}/user/searchuser/?keyword=${inputSearch}`,
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					});
					setInputSearch(res.data);
				} catch (error) {
					console.log('에러입니다', error);
				}
			}
			searchData();
		};
	}, [url, inputSearch]);

	return (
		<div>
			<NavbarWrap spaceBetween>
				<Backspace />
				<SearchInput placeholder='계정 검색' />
			</NavbarWrap>

			<BottomNavContainer />
		</div>
	);
}
