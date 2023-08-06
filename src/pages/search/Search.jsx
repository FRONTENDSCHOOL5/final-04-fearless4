import React, { useState, useEffect } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import { SearchInput, SearchWrap, Wrapper } from './search.style';
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
import { Helmet } from 'react-helmet';
import Loading from '../../components/loading/Loading';
import getSearchdata from '../../api/searchApi';
import { useQuery } from '@tanstack/react-query';

export default function Search() {
	const navigate = useNavigate();

	const url = API_URL;
	const token = localStorage.getItem('token');
	const [keyword, setKeyword] = useState('');
	// const [searchData, setSearchData] = useState([]);
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

	const { data: searchData, isLoading } = useQuery(
		['searchData', debounceValue],
		() => getSearchdata(debounceValue),
		{ enabled: !!debounceValue }
	);

	// useEffect(() => {
	// 	if (debounceValue.length > 0) {
	// 		const getSearch = async () => {
	// 			try {
	// 				const res = await axios({
	// 					method: 'GET',
	// 					url: `${url}/user/searchuser/?keyword=${debounceValue}`,
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 						'Content-type': 'application/json',
	// 					},
	// 				});
	// 				setSearchData(res.data);
	// 			} catch (error) {
	// 				console.log('에러입니다', error);
	// 			}
	// 		};
	// 		getSearch();
	// 	}
	// }, [debounceValue]);

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
			<Helmet>
				<title>TravelUs | 검색</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<SearchInput
					placeholder='계정 검색'
					onChange={onChange}
					value={keyword}
				/>
			</NavbarWrap>
			<SearchWrap>
				{searchData?.map((item) => {
					return (
						<Wrapper key={item.id}>
							<UserWrap>
								<UserFlexWrap>
									<UserProfileImg>
										<UserFollowImage
											src={item.image}
											onError={onErrorImg}
											alt='유저 프로필 이미지입니다.'
											onClick={() => {
												navigate(`/profile/${item.accountname}`);
											}}
										/>
									</UserProfileImg>
									<UserContent
										onClick={() => {
											navigate(`/profile/${item.accountname}`);
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
											<SearchColor
												user={`@${item.accountname}`}
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
				{/* {isLoading && <Loading />} */}

				<BottomNavContainer />
			</SearchWrap>
		</>
	);
}
