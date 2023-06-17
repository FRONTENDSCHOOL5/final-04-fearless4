import styled from 'styled-components';

export const ProductContainer = styled.div`
	padding: 78px 34px 0px 34px;
	box-sizing: border-box;
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
	opacity: 0.3;
`;

export const InputStyle = styled.input`
	border: none;
	border-bottom: 1px solid #dbdbdb;
	font-size: 14px;
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
	width: 100%;
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
`