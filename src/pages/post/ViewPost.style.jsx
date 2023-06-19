import styled from 'styled-components';
import { OptionModalTab } from '../../components/navbar/navbar.style';

export const WrapperViewPost = styled.div`
	width: 100%;
	position: relative;
	box-sizing: border-box;
`;

// 게시글 작성에도 동일한 컴포넌트가 사용되니 묶어서 정리할 것
export const ProfileImagePost = styled.img`
	display: block;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	object-fit: cover;
`;

export const OptionModalTabComment = styled(OptionModalTab)`
	width: 20px;
	height: 20px;
`;

// 게시글 컴포넌트 삽입 전 임시로 작성
export const PostView = styled.div`
	width: 100%;
	height: 434px;
	background-color: #81d8d0;
	display: flex;
	padding: 68px 16px 26px 16px;
	justify-content: center;
	align-items: center;
	border-bottom: 2px solid #dbdbdb;
`;

export const CommentSection = styled.section`
	width: 100%;
	height: auto;
`;

export const UploadComment = styled.div`
	width: 100%;
	box-sizing: border-box;
	padding: 12px 16px;
	border-top: 1px solid #dbdbdb;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 18px;
`;

export const ProfileImageComment = styled.img`
	display: block;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	object-fit: cover;
`;

export const CommentInputArea = styled.textarea`
	width: 260px;
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

export const CommentUploadButton = styled.button`
	border: none;
	background-color: #fff;
	color: #81d8d0;
	cursor: pointer;
	font-size: 14px;
	font-weight: 700;
`;
