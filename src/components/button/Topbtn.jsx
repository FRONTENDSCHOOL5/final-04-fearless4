import React from 'react';
import { Topbutton } from './topbtn.style';

export default function Topbtn() {
	const scrollTop = () => {
		window.scroll({
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
