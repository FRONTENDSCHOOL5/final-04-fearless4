import React, { useState, useEffect } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
import {
	SearchInput,
	SearchWrap,
	Wrapper,
	NoData,
	NoData2,
	MoreBtn,
} from './search.style';

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
	const [keyword, setKeyword] = useState('');
	const [debounceValue, setDebounceValue] = useState(keyword);

	const [page, setPage] = useState(1);

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
		{
			enabled: !!debounceValue,
			select: (result) =>
				result
					.filter((user) => user.username.includes(debounceValue))
					.slice(0, page * 10),
		}
	);

	console.log(searchData);
	console.log(debounceValue);

	const onClickBtn = () => {
		setPage(page + 1);
	};

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
					aria-label='뒤로가기'
					onClick={() => {
						navigate(-1);
					}}
				/>
				<SearchInput
					placeholder='계정을 검색해보세요.'
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
				{searchData?.length > 0 && searchData?.length >= page * 10 && (
					<MoreBtn onClick={onClickBtn}>더보기 v</MoreBtn>
				)}
				{searchData?.length === 0 && (
					<>
						<NoData>검색 결과가 없습니다.</NoData>
						<NoData2>다른 검색어를 입력해보세요.</NoData2>
					</>
				)}
				{debounceValue && isLoading && <Loading />}
				<BottomNavContainer />
			</SearchWrap>
		</>
	);
}
