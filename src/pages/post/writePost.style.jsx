import styled from 'styled-components';

export const WrapperWritePost = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
	box-sizing: border-box;
	padding: 68px 16px 26px 16px;
	gap: 13px;
`;

export const ProfileImageMini = styled.img`
	display: block;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	object-fit: cover;
`;

export const ImageInput = styled.input`
	width: 100%;
	height: 100%;
	position: relative;
	opacity: 0;
	z-index: 1;
`;

export const PostInputArea = styled.textarea`
	padding-top: 15px;
	width: 100%;
	height: 100%;
	resize: none;
	border: none;
	font-size: 14px;
	&::placeholder {
		font-size: 14px;
	}
	&:focus {
		outline: none;
	}
`;

// export const ImageUploadButton = styled.button`
// 	background: url(${UploadImage});
// 	width: 50px;
// 	height: 50px;
// 	position: fixed;
// 	border: 0;
// 	bottom: 16px;
// 	right: 16px;
// 	cursor: pointer;
// `;
