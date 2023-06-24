import React, { useState, useEffect } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import { SearchInput, Wrapper } from './search.style';
import { API_URL } from '../../api.js';
import axios from 'axios';
import {
	UserWrap,
	UserFlexWrap,
	UserProfileImg,
	UserFollowImage,
	UserContent,
	UserFollowNickName,
	UserFollowIntro,
} from '../follow/follow.style';

import { useNavigate } from 'react-router-dom';

import ProfilePic from '../../assets/image/profilePic.png';

export default function Search() {
	const navigate = useNavigate();

	const url = API_URL;
	const token = localStorage.getItem('token');
	const [keyword, setKeyword] = useState('');
	const [searchData, setSearchData] = useState([]);
	const [debounceValue, setDebounceValue] = useState(keyword);

	const onChange = (event) => {
		setKeyword(event.target.value);
	};
	const onErrorImg = (e) => {
		e.target.src = ProfilePic;
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceValue(keyword);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [keyword]);

	useEffect(() => {
		if (debounceValue.length > 0) {
			const getSearch = async () => {
				try {
					const res = await axios({
						method: 'GET',
						url: `${url}/user/searchuser/?keyword=${debounceValue}`,
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-type': 'application/json',
						},
					});
					setSearchData(res.data);
				} catch (error) {
					console.log('에러입니다', error);
				}
			};
			getSearch();
		}
	}, [debounceValue]);

	const SearchColor = ({ user, word, type }) => {
		return user.includes(word) ? (
			<div type={type}>
				{user.split(word)[0]}
				<span style={{ color: '#A6E3DA' }}>{debounceValue}</span>
				{user.split(word)[1]}
			</div>
		) : (
			<div type={type}>{user}</div>
		);
	};

	return (
		<>
			<NavbarWrap spaceBetween>
				<Backspace />
				<SearchInput
					placeholder='계정 검색'
					onChange={onChange}
					value={keyword}
				/>
			</NavbarWrap>

			{searchData.map((item, index) => {
				return (
					<Wrapper key={index}>
						<UserWrap>
							<UserFlexWrap>
								<UserProfileImg>
									<UserFollowImage
										src={item.image}
										onError={onErrorImg}
										alt='유저 프로필 이미지입니다.'
									/>
								</UserProfileImg>
								<UserContent
									onClick={() => {
										navigate('/userprofile', {
											state: { accountname: item.accountname },
										});
									}}
								>
									<UserFollowNickName>
										<SearchColor
											user={item.username}
											word={keyword}
											type='username'
										></SearchColor>
									</UserFollowNickName>
									<UserFollowIntro>
										@
										<SearchColor
											user={item.accountname}
											word={keyword}
											type='accountname'
										/>
									</UserFollowIntro>
								</UserContent>
							</UserFlexWrap>
						</UserWrap>
					</Wrapper>
				);
			})}

			<BottomNavContainer />
		</>
	);
}
