import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import {
	CommentWrapper,
	FollowerProfileImageComment,
	CommentDetail,
	CommentFollower,
	CommentFollowerName,
	CommentTime,
	CommentText,
	OptionModalTabComment,
} from './ViewPost.style';

export const Comment = ({ comment }) => {
	const { author, createdAt, content } = comment;

	moment.locale('ko');
	const fromNow = moment(createdAt).fromNow();

	return (
		<CommentWrapper>
			<FollowerProfileImageComment
				src={author.image}
			></FollowerProfileImageComment>
			<CommentDetail>
				<CommentFollower>
					<CommentFollowerName>{author.username}</CommentFollowerName>
					<CommentTime>{fromNow}</CommentTime>
				</CommentFollower>

				<CommentText>{content}</CommentText>
			</CommentDetail>
			<OptionModalTabComment></OptionModalTabComment>
		</CommentWrapper>
	);
};
