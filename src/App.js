import { GlobalStyle } from './GlobalStyle';
import GlobalFonts from './fonts/fonts';
import Router from './routes/Router';
function App() {
	return (
		<>
			<GlobalStyle />
			<GlobalFonts />
			<Router />
		</>
	);
}

export default App;
