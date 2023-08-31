import React from 'react';
import Cat404 from '../../assets/image/cat404.png';
import Snore from '../../assets/image/snore.png';
import Luggage from '../../assets/image/luggage.png';
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
	CatWrap,
} from './page404.style';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Page404(props) {
	const navigate = useNavigate();
	return (
		<>
			<Helmet>
				<title>TravelUs | 오류</title>
			</Helmet>

			<Page404Wrap>
				<NotFoundSign alt='에러페이지 경고문구' src={Sign} />
				<NotFoundText>
					404
					<br />
					{props.message ? <>{props.message} </> : <>page not Found </>}
				</NotFoundText>
				<CatWrap>
					<Cat404Img alt='잠자는 고양이' src={Cat404} />
					<LuggageImg alt='케리어 가방' src={Luggage} />
					<AnimationWrap>
						<SnoreLargeImg alt='z' src={Snore} />
						<SnoreMediumImg alt='z' src={Snore} />
						<SnoreSmallImg alt='z' src={Snore} />
					</AnimationWrap>
				</CatWrap>
				<HomeButton
					onClick={() => {
						navigate('/homeFeed');
					}}
				>
					홈으로 돌아가기
				</HomeButton>
			</Page404Wrap>
		</>
	);
}
