import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
} from '../../components/navbar/navbar.style';
import ProfilePic from '../../assets/image/profilePic.png';

const ViewPost = () => {
	return (
		<>
			<NavbarWrap spaceBetween>
				<Backspace />
				<OptionModalTab></OptionModalTab>
			</NavbarWrap>
		</>
	);
};

export default ViewPost;
