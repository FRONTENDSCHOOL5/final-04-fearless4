import React, { useState } from 'react';
import {
	PostListWrapper,
	PostStyleAlbum,
	PostStyleList,
	PostViewStyleBar,
} from './postList.style';
import PostSection from './PostSection';
import postAlbumOff from '../../assets/icon/icon-post-album-off.svg';
import postAlbumOn from '../../assets/icon/icon-post-album-on.svg';
import postListOff from '../../assets/icon/icon-post-list-off.svg';
import postListOn from '../../assets/icon/icon-post-list-on.svg';

const PostListView = ({ accountname }) => {
	const [listView, setListView] = useState(false);
	const [albumView, setAlbumView] = useState(true);

	const handleListView = () => {
		setListView(!listView);
		setAlbumView(!albumView);
	};

	const handleAlbumView = () => {
		setAlbumView(!albumView);
		setListView(!listView);
	};

	return (
		<PostListWrapper>
			<PostViewStyleBar>
				<PostStyleList onClick={handleListView}>
					<img src={listView ? postListOn : postListOff} alt='list view' />
				</PostStyleList>
				<PostStyleAlbum onClick={handleAlbumView}>
					<img src={albumView ? postAlbumOn : postAlbumOff} alt='album view' />
				</PostStyleAlbum>
			</PostViewStyleBar>
			<PostSection accountname={accountname}></PostSection>
		</PostListWrapper>
	);
};

export default PostListView;
