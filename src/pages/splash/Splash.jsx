import React, { useEffect } from 'react';
import { Background } from '../../components/background/background.style';
import { LogoContainer } from '../../components/logo/logo.style.jsx';
import { LogoText } from '../../components/logo/logo.style.jsx';
import { Wrapper } from './splash.style';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			navigate('/myprofile');
		} else {
			navigate('/login');
		}
	}, []);
	return (
		<Background>
			<Wrapper>
				<LogoContainer />
				<LogoText>TravelUS</LogoText>
			</Wrapper>
		</Background>
	);
}
