import React from 'react';
import { Topbutton } from './topbtn.style';

export default function Topbtn({ homefeedWrap }) {
	const scrollTop = () => {
		homefeedWrap.scroll({
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
