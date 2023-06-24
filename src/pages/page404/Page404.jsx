import React from 'react';
import Cat404 from '../../assets/image/cat404.png';
import Snore from '../../assets/image/snore.png';
import Baggage2 from '../../assets/image/baggage2.png';
import Sign from '../../assets/image/sign.png';
import {
	AnimationWrap,
	HomeButton,
	LuggageImg,
	NotFoundSign,
	NotFoundText,
	Cat404Img,
	Page404Wrap,
	SnoreLargeImg,
	SnoreMediumImg,
	SnoreSmallImg,
} from './page404.style';
import { useNavigate } from 'react-router-dom';

export default function Page404() {
	const navigate = useNavigate();
	return (
		<Page404Wrap>
			<NotFoundSign src={Sign} />
			<NotFoundText>
				404
				<br />
				Page not Found
			</NotFoundText>
			<Cat404Img src={Cat404} />
			<HomeButton
				onClick={() => {
					navigate('/homeFeed');
				}}
			>
				홈으로 돌아가기
			</HomeButton>
			<div>
				<AnimationWrap>
					<SnoreLargeImg src={Snore} />
					<SnoreMediumImg src={Snore} />
					<SnoreSmallImg src={Snore} />
				</AnimationWrap>
				<LuggageImg src={Baggage2} />
			</div>
		</Page404Wrap>
	);
}
