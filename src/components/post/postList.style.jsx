import styled from 'styled-components';
import PostSection from './PostSection';

export const PostListWrapper = styled.div`
	width: 100%;
	border: 0.5px solid #dbdbdb;
	background-color: #fff;

	box-sizing: border-box;
`;

export const PostViewStyleBar = styled.div`
	width: 100%;
	display: flex;
	gap: 16px;
	padding: 9px 16px;
	justify-content: flex-end;
	box-sizing: border-box;
`;

export const PostStyleList = styled.div`
	width: 26px;
	height: auto;
	cursor: pointer;
`;
export const PostStyleAlbum = styled.div`
	width: 26px;
	height: auto;
	cursor: pointer;
`;

export const PostSectionStyle = styled(PostSection)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
