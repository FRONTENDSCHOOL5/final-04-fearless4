import styled from 'styled-components';

export const ProductContainer = styled.div`
	padding: 26px 34px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Upload = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	flex-direction: column;
`;

export const UploadImageBtn = styled.img`
	width: 36px;
	height: 36px;
	position: absolute;
	bottom: 12px;
	right: 12px;
	z-index: 1;
	pointer-events: none;
`;

export const InputStyle = styled.input`
	font-family: 'Suit-Regular';
	border: none;
	border-bottom: 1px solid #dbdbdb;
	font-size: 14px;
	width: 322px;
	&:focus {
		outline: none;
		border-color: #81d8d0;
	}

	&::placeholder {
		color: #dbdbdb;
	}
`;

export const BgBtnInputStyle = styled(InputStyle)`
	background-color: rgba(242, 242, 242, 1);
	width: 322px;
	height: 204px;
	border-radius: 10px;
	margin-top: 18px;
	box-sizing: border-box;
	opacity: 0;
	&:hover {
		cursor: pointer;
	}
`;

export const BgBtnCover = styled.div`
	position: absolute;
	top: 31px;
	width: 322px;
	height: 204px;
	border-radius: 10px;
	background-color: rgba(242, 242, 242, 1);
	border: 0.5px solid #dbdbdb;
	box-sizing: border-box;
	pointer-events: none;
`;

export const InputWrap = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 30px;
	gap: 16px;
`;

export const InputList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const UploadImage = styled.img`
	height: 100%;
	width: 100%;
	border-radius: 10px;
	object-fit: cover;
`;

export const RadioCover = styled.div`
	margin-top: 14px;
	display: flex;
	gap: 10px;
	color: #767676;
	font-size: 14px;
	margin-left: -4px;
`;

export const RadioInput = styled.input`
	appearance: none;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	border: 0.5px solid #505050;
	outline: none;

	&:checked {
		background-color: #81d8d0;
		border: none;
	}
`;
