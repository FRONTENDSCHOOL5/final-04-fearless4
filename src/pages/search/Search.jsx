import React from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { BottomNavContainer } from '../../components/bottomnav/bottomnav.style';
export default function Search() {
	return (
		<div>
			<NavbarWrap spaceBetween>
				<Backspace />
			</NavbarWrap>
			<BottomNavContainer />
		</div>
	);
}
