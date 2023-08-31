import { MobileColor, MoblieWidth, MoblieWrap } from './AppMobile.style';
import { GlobalStyle } from '../GlobalStyle';
import GlobalFonts from '../fonts/fonts';
import Router from '../routes/Router';
import { HelmetProvider } from 'react-helmet-async';

function App() {
	return (
		<HelmetProvider>
			<MoblieWrap>
				<MoblieWidth>
					<GlobalStyle />
					<GlobalFonts />
					<MobileColor>
						<Router />
					</MobileColor>
				</MoblieWidth>
			</MoblieWrap>
		</HelmetProvider>
	);
}

export default App;
