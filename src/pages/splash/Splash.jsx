import { Background } from '../../components/background/background.style';
import { LogoContainer } from '../../components/logo/logo.style.jsx';
import { LogoText } from '../../components/logo/logo.style.jsx';
import { Wrapper } from './splash.style';

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
