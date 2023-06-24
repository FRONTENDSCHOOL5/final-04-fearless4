import { MobileColor, MoblieWidth, MoblieWrap } from './AppMobile.style';
import { GlobalStyle } from '../GlobalStyle';
import GlobalFonts from '../fonts/fonts';
import Router from '../routes/Router';
function App() {
	return (
		<MoblieWrap>
			<MoblieWidth>
				<GlobalStyle />
				<GlobalFonts />
				<MobileColor>
					<Router />
				</MobileColor>
			</MoblieWidth>
		</MoblieWrap>
	);
}

export default App;
