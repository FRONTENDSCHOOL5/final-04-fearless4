import styled from 'styled-components';

export const WrapperProfileSetup = styled.div`
	width: 100%;
	justify-content: center;
	box-sizing: border-box;
	padding: 54px 34px 0px 34px;
`;

export const ProfileText = styled.h1`
	display: block;
	text-align: center;
	font-size: 24px;
	margin-bottom: 16px;
	font-weight: 700;
`;

export const DescriptionText = styled.p`
	display: block;
	text-align: center;
	font-size: 14px;
	color: #767676;
	margin-bottom: 30px;
`;

export const Upload = styled.div`
	width: 110px;
	height: 110px;
	margin: 0 auto;
	padding: 0;
	display: flex;
	justify-content: center;
	position: relative;
`;

export const ProfileImage = styled.img`
	width: 100%;
	cursor: pointer;
`;

export const ImageButton = styled.img`
	width: 36px;
	position: absolute;
	bottom: 0;
	right: 0;
	cursor: pointer;
`;

export const Name = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const ID = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;

	span {
		font-size: 12px;
		color: #eb5757;
	}
`;

export const Intro = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const LabelStyle = styled.label`
	color: #767676;
	font-size: 12px;
`;
