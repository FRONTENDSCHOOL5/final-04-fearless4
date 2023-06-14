// 지금 해야 할 것
// 1. import로 필요한 것 불러오기
// 2. 페이지에 필요한 스타일 컴포넌트 작성하기
// 3. 컴포넌트로 마크업 구현하기
// 4. 레이아웃 다 잡히면 기능명세 보고 기능구현 생각해보기
// 5. 기능구현하고 리팩토링하기

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavbarWrap } from '../../components/navbar/navbar.style';

const WritePost = () => {
	return (
		<>
			<NavbarWrap></NavbarWrap>
		</>
	);
};

export default WritePost;
