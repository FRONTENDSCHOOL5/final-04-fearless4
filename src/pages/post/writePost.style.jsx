import styled from 'styled-components';
import DeleteButtonImg from '../../assets/icon/x.svg';

export const WrapperWritePost = styled.div`
	width: 100%;
	position: relative;
	box-sizing: border-box;
`;

export const Button = styled.button`
	border-radius: 32px;
	color: rgba(255, 255, 255, 1);
	width: 90px;
	height: 32px;
	background-color: #81d8d0;
	border: none;
	font-size: 14px;
	opacity: ${({ disabled }) => (disabled === true ? 0.3 : 1)};
	cursor: ${({ disabled }) => (disabled === true ? 'not-allowed' : 'pointer')};
`;

export const UploadButton = ({ disabled, onClick }) => {
	return (
		<Button disabled={disabled} onClick={onClick}>
			업로드
		</Button>
	);
};

export const PostForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 68px 16px 26px 16px;
	gap: 16px;
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

export const TextForm = styled.div`
	display: flex;
	gap: 13px;
`;

export const PostInputArea = styled.textarea`
	padding-top: 15px;
	width: 100%;
	resize: none;
	border: none;
	border-bottom: 1px solid #dbdbdb;
	font-size: 14px;
	&::placeholder {
		font-size: 14px;
	}
	&:focus {
		outline: none;
		border-color: #81d8d0;
	}
`;

export const ImageContainer = styled.div`
	position: relative;
	display: inline-block;
	align-self: flex-end;
	width: 300px;

	> img {
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 10px;
	}
`;

export const DeleteIcon = styled.img`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
	width: 24px !important;
	height: 24px !important;
`;

export const ImagePreview = ({ src, alt, handleDeleteImage }) => {
	const handleClickDelete = () => {
		handleDeleteImage();
	};

	return (
		<ImageContainer>
			<img src={src} alt={alt} />
			<StyledDeleteIcon
				src={DeleteButtonImg}
				alt='Delete'
				onClick={handleClickDelete}
			/>
		</ImageContainer>
	);
};
