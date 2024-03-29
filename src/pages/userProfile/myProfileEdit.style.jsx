import styled from 'styled-components';

export const ProfileEditTitle = styled.h1`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;

export const WrapperProfileSetup = styled.main`
	width: 100%;
	justify-content: center;
	box-sizing: border-box;
	padding: 26px 34px;
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
	cursor: pointer;
`;

export const ImageInput = styled.input`
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: 0;
	z-index: 1;
	cursor: pointer;
`;

export const ProfileImage = styled.img`
	width: 100%;
	border-radius: 50%;
	object-fit: cover;
	flex-shrink: 0;
`;

export const LabelStyleImg = styled.label`
	clip: rect(1px, 1px, 1px, 1px);
	clip-path: inset(50%);
	width: 1px;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
`;

export const ImageButton = styled.img`
	width: 36px;
	position: absolute;
	bottom: 0;
	right: 0;
`;

export const FormElement = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const LabelStyle = styled.label`
	color: #767676;
	font-size: 12px;
`;
