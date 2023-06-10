import React from 'react';
import styled from 'styled-components';
import { Background } from '../components/background/background.style.jsx';
import LogoContainer from '../components/logo/LogoContainer.jsx';

import { LogoText } from '../components/logo/logo.style.jsx';

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin: 0 auto;
`;

export default function Splash() {
	return (
		<Background>
			<Wrapper>
				<LogoContainer />
				<LogoText>TravelUS</LogoText>
			</Wrapper>
		</Background>
	);
}
