import React from 'react';
import { Topbutton } from './topbtn.style';

export default function Topbtn({ scrollWrap }) {
	const scrollTop = () => {
		scrollWrap.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<>
			<Topbutton
				aria-label='페이지 최상단으로 이동합니다'
				onClick={scrollTop}
			></Topbutton>
		</>
	);
}
