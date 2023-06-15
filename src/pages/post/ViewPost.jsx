import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Backspace,
	NavbarWrap,
	OptionModalTab,
	NavbarTitle,
} from '../../components/navbar/navbar.style';

const WritePost = () => {
	return (
		<>
			<NavbarWrap profile>
				<Backspace />
				<NavbarTitle>네비게이션 바 타이틀입니다</NavbarTitle>
			</NavbarWrap>
		</>
	);
};

export default WritePost;
