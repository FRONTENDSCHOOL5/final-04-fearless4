import styled from 'styled-components';

export const WrapperProfileSetup = styled.div`
	width: 100%;
	justify-content: center;
	box-sizing: border-box;
	padding: 54px 34px 0px 34px;
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
`;

export const ProfileImage = styled.img`
	width: 100%;
	border-radius: 50%;
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
