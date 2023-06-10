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
	border: none;
	border-bottom: 1px solid #dbdbdb;
	&:focus {
		outline: none;
		border-color: #81d8d0;
	}
`;

export const Incorrect = styled.span`
	margin-top: 12px;
	color: #eb5757;
	font-size: 12px;
	margin-bottom: 30px;
`;
