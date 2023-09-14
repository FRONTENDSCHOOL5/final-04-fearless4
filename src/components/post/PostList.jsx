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

const PostList = ({ accountname }) => {
	const [listView, setListView] = useState(true);
	const [albumView, setAlbumView] = useState(false);

	const handleListView = () => {
		if (!listView) {
			setListView(!listView);
			setAlbumView(!albumView);
		}
	};

	const handleAlbumView = () => {
		if (!albumView) {
			setAlbumView(!albumView);
			setListView(!listView);
		}
	};

	return (
		<PostListWrapper>
			<PostViewStyleBar>
				<PostStyleList onClick={handleListView}>
					<img
						src={listView ? postListOn : postListOff}
						alt='list view'
						style={{ width: '26px', height: '26px' }}
					/>
				</PostStyleList>
				<PostStyleAlbum onClick={handleAlbumView}>
					<img
						src={albumView ? postAlbumOn : postAlbumOff}
						alt='album view'
						style={{ width: '26px', height: '26px' }}
					/>
				</PostStyleAlbum>
			</PostViewStyleBar>
			<PostSection accountname={accountname} listView={listView}></PostSection>
		</PostListWrapper>
	);
};

export default PostList;
