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
			<Topbutton onClick={scrollTop}></Topbutton>
		</>
	);
}
