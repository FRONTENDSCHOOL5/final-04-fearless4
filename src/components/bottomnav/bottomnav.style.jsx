import React, { useState } from 'react';
import styled from 'styled-components';
import homeIcon from '../../assets/icon/icon-home.svg';
import messageIcon from '../../assets/icon/icon-message-circle.svg';
import postIcon from '../../assets/icon/icon-post.svg';
import profileIcon from '../../assets/icon/icon-profile.svg';
import homeIconFill from '../../assets/icon/icon-home-fill.svg';
import messageIconFill from '../../assets/icon/icon-message-circle-fill.svg';
import postIconFill from '../../assets/icon/icon-post-fill.svg';
import profileIconFill from '../../assets/icon/icon-profile-fill.svg';
import { Link } from 'react-router-dom';

export const BottomNav = styled.nav`
	position: relative;
	bottom: 0;
	width: 100%;
	height: 50px;
	display: flex;
	background-color: white;
	border-top: solid 1px #dbdbdb;
`;
// export const NavContent = styled.ul`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	justify-content: space-between;
// `;

// export const NavList = styled.li`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	justify-content: center;
// 	flex-grow: 1;
// 	gap: 4px;
// 	font-size: 10px;
// 	color: #767676;
// 	text-decoration: none;
// 	padding: 12px 0px 6px 0px;
// `;

export const NavLink = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	gap: 4px;
	font-size: 10px;
	color: #767676;
	text-decoration: none;
	padding: 12px 0px 6px 0px;
`;

export const NavIcon = styled.img`
	width: 24px;
	height: 24px;

	&:hover {
		transition: transform 0.4s;
		transform: rotate(360deg);
	}
`;

export function BottomNavContainer(props) {
	const [isHomeMouseOver, setIsHomeMouseOver] = useState(false);
	const [isMessageMouseOver, setIsMessageMouseOver] = useState(false);
	const [isPostMouseOver, setIsPostMouseOver] = useState(false);
	const [isProfileMouseOver, setIsProfileMouseOver] = useState(false);

	const handleMouseOver = (e) => {
		if (e.target.id === 'home') {
			setIsHomeMouseOver(true);
		} else if (e.target.id === 'message') {
			setIsMessageMouseOver(true);
		} else if (e.target.id === 'post') {
			setIsPostMouseOver(true);
		} else if (e.target.id === 'profile') {
			setIsProfileMouseOver(true);
		}
	};

	const handleMouseOut = (e) => {
		if (e.target.id === 'home') {
			setIsHomeMouseOver(false);
		} else if (e.target.id === 'message') {
			setIsMessageMouseOver(false);
		} else if (e.target.id === 'post') {
			setIsPostMouseOver(false);
		} else if (e.target.id === 'profile') {
			setIsProfileMouseOver(false);
		}
	};

	return (
		<BottomNav>
			<NavLink to='/homeFeed'>
				<NavIcon
					id='home'
					src={
						isHomeMouseOver
							? homeIconFill
							: props.home === true
							? homeIconFill
							: homeIcon
					}
					alt='홈버튼'
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				/>
				<span className='nav-text'>홈</span>
			</NavLink>

			<NavLink to='/chat'>
				<NavIcon
					id='message'
					src={
						isMessageMouseOver
							? messageIconFill
							: props.message === true
							? messageIconFill
							: messageIcon
					}
					alt='채팅 버튼'
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				/>
				<span className='nav-text'>채팅</span>
			</NavLink>

			<NavLink to='/post/upload'>
				<NavIcon
					id='post'
					src={
						isPostMouseOver
							? postIconFill
							: props.post === true
							? postIconFill
							: postIcon
					}
					alt='게시물 작성 버튼'
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				/>
				<span className='nav-text'>게시물 작성</span>
			</NavLink>

			<NavLink to={`/profile`}>
				<NavIcon
					id='profile'
					src={
						isProfileMouseOver
							? profileIconFill
							: props.profile === true
							? profileIconFill
							: profileIcon
					}
					alt='프로필 버튼'
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
				/>
				<span className='nav-text'>프로필</span>
			</NavLink>
		</BottomNav>
	);
}
