import React from 'react';
import * as P from '../../components/post/post.style';
import heartIcon from '../../assets/icon/icon-heart.svg';
import messageIcon from '../../assets/icon/icon-message-circle.svg';
import dotIcon from '../../assets/icon/icon- more-vertical.svg';
import styled from 'styled-components';

export const ProfileImg = styled.img`
	position: relative;
	width: 42px;
	height: 42px;
	object-fit: cover;
	border-radius: 50%;
	margin-right: 12px;
`;

export const Cover = styled.img`
	width: 100%;
	height: auto;
	object-fit: cover;
	border-radius: 10px;
`;

export default function PostFeed({ data }) {
	return (
		<P.Container>
			<P.Card>
				<ProfileImg
					src={data.author.image}
					alt='Profile Image'
					className='profile_img'
				/>
				<P.RightCard>
					<P.Top>
						<P.UserDetails>
							<P.SpanName className='span-name'>
								{data.author.username}
							</P.SpanName>
							<P.SpanId className='span-id'>
								@{data.author.accountname}
							</P.SpanId>
						</P.UserDetails>
						<P.Dot src={dotIcon} alt='Dot Icon'></P.Dot>
					</P.Top>
					<P.TextPost>{data.content}</P.TextPost>

					{data.image ? (
						data.image.split(',').length > 1 ? (
							<P.ImgBx>
								{data.image.split(',').map((item) => {
									return (
										<Cover
											src={item}
											alt={`${data.author.username}의 게시글 이미지`}
										/>
									);
								})}
							</P.ImgBx>
						) : (
							<Cover
								src={data.image}
								alt={`${data.author.username}의 게시글 이미지`}
							/>
						)
					) : null}

					<P.Icons>
						<P.IconsImg src={heartIcon} alt='Heart Icon' />
						<P.IconsSpan>{data.heartCount}</P.IconsSpan>
						<P.IconsImg src={messageIcon} alt='Message Icon' />
						<P.IconsSpan>{data.commentCount}</P.IconsSpan>
					</P.Icons>
					<P.PostDate>{data.createdAt.slice(0, 10)}</P.PostDate>
				</P.RightCard>
			</P.Card>
		</P.Container>
	);
}
