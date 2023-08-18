import React from 'react';
import Load from './loading.gif';
import styled from 'styled-components';

export const LoadingWrap = styled.div`
	width: 100%;
	position: absolute;
	height: calc(100vh - 50px - 50px);
	background-color: #fff;
`;

const Loaded = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default function Loading() {
	return (
		<LoadingWrap>
			<Loaded src={Load} alt='로딩중' width='20%' />
		</LoadingWrap>
	);
}
