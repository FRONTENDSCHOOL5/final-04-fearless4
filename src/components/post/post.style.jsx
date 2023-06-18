import styled from 'styled-components';
import heartIcon from '../../assets/icon/icon-heart.svg';
import messageIcon from '../../assets/icon/icon-message-circle.svg';
import dotIcon from '../../assets/icon/icon- more-vertical.svg';
import profileImg from '../../assets/image/profilePic.png';
import postImg from '../../assets/image/travelchar_crop.png'; //임시사진

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
`;

export const Card = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	padding: 20px 16px;
	justify-content: center;
`;

export const RightCard = styled.div`
	position: relative;
	margin-top: 4px;
`;

export const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const ProfileImg = styled.img`
	position: relative;
	min-width: 42px;
	height: 42px;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 12px;
	display: block;
`;

export const Cover = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	object-fit: cover;
	top: 0;
	left: 0;
`;

export const SpanName = styled.span`
	font-size: 14px;
	color: #000;
	font-weight: bold;
	display: block;
`;

export const SpanId = styled.span`
	font-size: 12px;
	color: #767676;

	display: block;
	margin-top: 2px;
`;

export const Dot = styled.img`
	width: 18px;
	height: 18px;
	cursor: pointer;
`;

export const TextPost = styled.div`
	margin-top: 16px;
	font-size: 14px;
`;

export const ImgBx = styled.div`
	position: relative;
	width: 100%;
	height: 260px;
	margin-top: 16px;
	border-radius: 10px;
	overflow: hidden;
`;

export const Icons = styled.div`
	display: flex;

	margin-top: 12px;
	position: relative;
	align-items: center;
`;

export const IconsImg = styled.img`
	width: 20px;
	height: 20px;
	margin-right: 6px;
	cursor: pointer;
`;

export const IconsSpan = styled.span`
	font-size: 12px;
	color: #767676;
	text-align: center;
	margin-right: 16px;
`;

export const Date = styled.div`
	margin-top: 16px;
	font-size: 10px;
	color: #767676;
`;

export function Post() {
	return (
		<Container>
			<Card>
				<ProfileImg
					src={profileImg}
					alt='Profile Image'
					className='profile_img'
				/>
				<RightCard>
					<Top>
						<UserDetails>
							<SpanName className='span-name'>애월읍 위니브 감귤농장</SpanName>
							<SpanId className='span-id'>@weniv_Mandarin</SpanId>
						</UserDetails>
						<Dot src={dotIcon} alt='Dot Icon'></Dot>
					</Top>
					<TextPost>
						옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
						이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는
						풍부하게 뛰노는 인생의 힘있다.
					</TextPost>
					<ImgBx>
						<Cover src={postImg} alt='업로드한 이미지' />
					</ImgBx>
					<Icons>
						<IconsImg src={heartIcon} alt='Heart Icon' />
						<IconsSpan>20</IconsSpan>
						<IconsImg src={messageIcon} alt='Message Icon' />
						<IconsSpan>13</IconsSpan>
					</Icons>
					<Date>June 18, 2023</Date>
				</RightCard>
			</Card>
		</Container>
	);
}
