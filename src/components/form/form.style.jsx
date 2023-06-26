import styled from 'styled-components';

export const WrapForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 16px;
`;

export const WrapEmailPw = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const LabelStyle = styled.label`
	color: #767676;
	font-size: 12px;
`;

export const InputStyle = styled.input`
	font-family: 'Suit-Regular';
	border: none;
	padding-bottom: 8px;
	border-bottom: 1px solid #dbdbdb;
	&:focus {
		outline: none;
		border-color: #81d8d0;
	}

	&::placeholder {
		color: #dbdbdb;
	}
`;

export const Incorrect = styled.span`
	box-sizing: border-box;
	color: #eb5757;
	font-size: 12px;
`;

export const Title = styled.h1`
	font-family: 'Suit-Bold';
	display: block;
	text-align: center;
	font-size: 24px;
	margin-bottom: ${({ mb }) => (mb === true ? `16px` : 0)};
`;
