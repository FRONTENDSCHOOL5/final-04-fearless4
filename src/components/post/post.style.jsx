import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	min-width: 358px;
	flex-grow: 1;
`;

export const Card = styled.div`
	position: relative;
	display: flex;
	min-width: 100%;
	height: 100%;
	padding: 20px 16px;
	justify-content: center;
	box-sizing: border-box;
`;

export const RightCard = styled.div`
	position: relative;
	margin-top: 4px;
	flex: 1;
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
	cursor: pointer;
`;

export const ProfileImg = styled.img`
	position: relative;
	width: 42px;
	height: 42px;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 12px;
	display: block;
	object-fit: cover;
	cursor: pointer;
`;

export const SpanName = styled.span`
	font-family: 'Suit-Bold';
	font-size: 14px;
	color: #000;
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
	margin: 16px 0;
	font-size: 14px;
	min-width: 200px;
	white-space: pre-wrap;
	line-height: 1.3em;
`;

export const ImgBx = styled.div`
	position: relative;
	width: 100%;
	height: auto;
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

export const PostDate = styled.div`
	margin-top: 16px;
	font-size: 10px;
	color: #767676;
`;
