import React from 'react';
import {
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
	ToastClose,
} from './toast.style';

export const Toast = ({ showToast, handleCloseToast }) => {
	return (
		<>
			{showToast && (
				<ToastContainer>
					<ToastIcon>😺</ToastIcon>
					<ToastMsg>
						<ToastMsgBold>상품</ToastMsgBold>이 등록되었습니다.
					</ToastMsg>
					<ToastClose onClick={handleCloseToast}>X</ToastClose>
				</ToastContainer>
			)}
		</>
	);
};

export const WrongExtensionToast = ({ showWrongExtensionToast }) => (
	<>
		{showWrongExtensionToast && (
			<ToastContainer>
				<ToastIcon>😵‍💫</ToastIcon>
				<ToastMsg>
					<ToastMsgBold>이미지</ToastMsgBold>만 업로드 해 주세요!
				</ToastMsg>
			</ToastContainer>
		)}
	</>
);

export const SizeOverToast = ({ showSizeOverToast }) => (
	<>
		{showSizeOverToast && (
			<ToastContainer>
				<ToastIcon>😵</ToastIcon>
				<ToastMsg>
					<ToastMsgBold>10MB</ToastMsgBold>이하의 파일만 업로드 해 주세요!
				</ToastMsg>
			</ToastContainer>
		)}
	</>
);
