import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import catLogo from '../../assets/image/findCat.png';
import bubble from '../../assets/image/speech-bubble.png';
// 말풍선 출처
// https://pixabay.com/ko/vectors/%EC%97%B0%EC%84%A4-%EA%B1%B0%ED%92%88-%EB%A7%90%ED%92%8D%EC%84%A0-%EB%A7%90%ED%95%98%EB%8A%94-156056/

const FollowContainer = styled.div`
	position: relative;
	width: 100%;
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 0 auto;
`;

const Span = styled.span`
	font-size: 14px;
	color: #767676;
	text-align: center;
	line-height: 20px;
`;

const SearchBtn = styled.button`
	width: 120px;
	height: 44px;
	margin-top: 30px;
	font-size: 14px;
	background-color: #81d8d0;
	color: white;
	border-radius: 44px;
	border: none;
	cursor: pointer;
`;

const FollowLogo = styled.div`
	width: 250px;
	min-height: 100px;
	display: flex;
	position: relative;
	background-color: white;
	overflow: hidden;
`;
const Logo = styled.img`
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: cover;
`;

const BubbleLogo = styled.div`
	width: 250px;
	min-height: 250px;
	margin-bottom: -28px;
	display: flex;
	position: relative;
	background-color: white;
	overflow: hidden;
`;

const Bubble = styled.img`
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	object-fit: cover;
`;

const BubbleSpan = styled.span`
	position: absolute;
	width: 200px;
	top: 44%;
	left: 48%;
	transform: translate(-50%, -50%);
	font-size: 14px;
	font-weight: 700;
	color: #767676;
	text-align: center;
	line-height: 23px;
`;

export default function FollowUnknown(props) {
	const navigate = useNavigate();
	return (
		<FollowContainer>
			<BubbleLogo>
				<Bubble src={bubble} />
				<BubbleSpan>
					추억을 공유할 사람을 찾아보고 함께 나눌 수 있는 사람을
					<br />
					만나보는 것은 어떠세요?
				</BubbleSpan>
			</BubbleLogo>

			<FollowLogo>
				<Logo src={catLogo} />
			</FollowLogo>
			<Span>
				{props.follower === true ? (
					<>팔로워한 유저가 없습니다</>
				) : (
					<>팔로잉한 유저가 없습니다</>
				)}
			</Span>
			<SearchBtn
				onClick={() => {
					navigate('/search');
				}}
			>
				유저검색
			</SearchBtn>
		</FollowContainer>
	);
}
