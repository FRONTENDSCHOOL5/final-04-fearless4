import { Background } from '../../components/background/background.style';
import {
	WavyChar,
	Wrapper,
	MascotImg,
	WavyCharWrap,
	TailImg,
	CatWrap,
	BaggageImg,
	SplashWrap,
} from './splash.style';
import Cat from '../../assets/image/cat.png';
import Tail from '../../assets/image/tail.png';
import Baggage from '../../assets/image/baggage.png';

export default function Splash() {
	return (
		<Background>
			<Wrapper>
				<SplashWrap>
					<CatWrap>
						<MascotImg src={Cat} />
						<TailImg src={Tail} />
						<BaggageImg src={Baggage} />
					</CatWrap>
					<WavyCharWrap>
						<WavyChar style={{ '--i': 1 }}>T</WavyChar>
						<WavyChar style={{ '--i': 2 }}>r</WavyChar>
						<WavyChar style={{ '--i': 3 }}>a</WavyChar>
						<WavyChar style={{ '--i': 4 }}>v</WavyChar>
						<WavyChar style={{ '--i': 5 }}>e</WavyChar>
						<WavyChar style={{ '--i': 6 }}>l</WavyChar>
						<WavyChar style={{ '--i': 7 }}>U</WavyChar>
						<WavyChar style={{ '--i': 8 }}>s</WavyChar>
					</WavyCharWrap>
				</SplashWrap>
			</Wrapper>
		</Background>
	);
}
