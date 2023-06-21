import styled from 'styled-components';
import homeIcon from '../../assets/icon/icon-home-fill.svg';
import editIcon from '../../assets/icon/icon-edit.svg';
import messageIcon from '../../assets/icon/icon-message-circle.svg';
import userIcon from '../../assets/icon/icon-user.svg';
import { Link } from 'react-router-dom';

export const BottomNav = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 50px;
	display: flex;
	background-color: white;
	border-top: solid 1px #dbdbdb;
`;

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
`;

export function BottomNavContainer() {
	return (
		<BottomNav>
			<NavLink href='#'>
				<NavIcon src={homeIcon} />
				<span className='nav-text'>홈</span>
			</NavLink>
			<NavLink href='#'>
				<NavIcon src={messageIcon} />
				<span className='nav-text'>채팅</span>
			</NavLink>
			<NavLink to='/writePost'>
				<NavIcon src={editIcon} />
				<span className='nav-text'>게시물 작성</span>
			</NavLink>
			<NavLink href='#'>
				<NavIcon src={userIcon} />
				<span className='nav-text'>프로필</span>
			</NavLink>
		</BottomNav>
	);
}
