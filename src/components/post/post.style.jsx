import styled from 'styled-components';
import heartIcon from '../../assets/icon/icon-heart.svg';
import messageIcon from '../../assets/icon/icon-message-circle.svg';
import dotIcon from '../../assets/icon/icon- more-vertical.svg';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	min-width: 358px;
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
	height: auto;
	margin-top: 16px;
	border-radius: 10px;
	overflow: hidden;
`;

export const Cover = styled.img`
	width: 100%;
	height: auto;
	object-fit: cover;
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

export function Post({
	myProfileImg,
	username,
	accountname,
	content,
	image,
	heartCount,
	commentCount,
	createdAt,
}) {
	return (
		<Container>
			<Card>
				<ProfileImg
					src={myProfileImg}
					alt='Profile Image'
					className='profile_img'
				/>
				<RightCard>
					<Top>
						<UserDetails>
							<SpanName className='span-name'>{username}</SpanName>
							<SpanId className='span-id'>@{accountname}</SpanId>
						</UserDetails>
						<Dot src={dotIcon} alt='Dot Icon'></Dot>
					</Top>
					<TextPost>{content}</TextPost>
					<ImgBx>
						<Cover src={image} alt='업로드한 이미지' />
					</ImgBx>
					<Icons>
						<IconsImg src={heartIcon} alt='Heart Icon' />
						<IconsSpan>{heartCount}</IconsSpan>
						<IconsImg src={messageIcon} alt='Message Icon' />
						<IconsSpan>{commentCount}</IconsSpan>
					</Icons>
					<Date>{createdAt}</Date>
				</RightCard>
			</Card>
		</Container>
	);
}
