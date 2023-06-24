import React from 'react';
import Load from './loading.gif';
import styled from 'styled-components';

const Loaded = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default function Loading() {
	return <Loaded src={Load} alt='로딩중' width='10%' />;
}
