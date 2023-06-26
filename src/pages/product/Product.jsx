import React, { useEffect, useState } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import {
	BgBtnCover,
	BgBtnInputStyle,
	InputList,
	InputStyle,
	InputWrap,
	ProductContainer,
	Upload,
	UploadImage,
	UploadImageBtn,
} from './product.style';
import { Incorrect, LabelStyle } from '../../components/form/form.style';
import UploadButton from '../../assets/image/profileImageUploadButton.png';
import { SaveButton } from '../../components/button/button.style';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
	ToastClose,
	ToastContainer,
	ToastIcon,
	ToastMsg,
	ToastMsgBold,
} from '../../components/toast/toast.style';

export default function Product() {
	// 이미지 등록
	const [selectedImage, setSelectedImage] = useState('');
	// 상품명 입력
	const [productName, setProductName] = useState('');
	const [productNameError, setProductNameError] = useState('');
	// 가격 입력
	const [productPrice, setProductPrice] = useState('');
	// URL 입력
	const [salesLink, setSalesLink] = useState('');
	const [salesLinkError, setSalesLinkError] = useState('');

	// 전체 유효성 검사
	const [isFormValid, setIsFormValid] = useState(false);
	const token = localStorage.getItem('token');

	const [showToast, setShowToast] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const isFormValid =
			selectedImage !== '' &&
			productNameError === '' &&
			productPrice !== '' &&
			salesLinkError === '';
		setIsFormValid(isFormValid);
	}, [selectedImage, productNameError, productPrice, salesLinkError]);

	const handleImageInputChange = async (e) => {
		const allowedExtensionsRegex = /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i;
		const maxImageSize = 10 * 1024 * 1024;
		const imageFile = e.target.files[0];

		if (imageFile) {
			if (imageFile.size > maxImageSize) {
				alert(
					'이미지 크기가 너무 큽니다. \n10MB보다 작은 이미지를 업로드 해주세요!'
				);
				e.target.value = '';
				return;
			}
			const fileExtension = '.' + imageFile.name.split('.').pop().toLowerCase();
			if (!allowedExtensionsRegex.test(fileExtension)) {
				alert(
					'올바른 파일 확장자가 아닙니다!\n올바른 파일 확장자는 다음과 같습니다: .jpg, .gif, .png, .jpeg, .bmp, .tif, .heic'
				);
				e.target.value = '';
				return;
			}

			const formData = new FormData();
			const reader = new FileReader();

			formData.append('image', imageFile);

			reader.onloadend = () => {
				setSelectedImage(reader.result);
			};

			if (imageFile) {
				reader.readAsDataURL(imageFile);
			}
			try {
				const res = await axios({
					method: 'POST',
					url: 'https://api.mandarin.weniv.co.kr/image/uploadfile/',
					data: formData,
					headers: {
						'Content-type': 'multipart/form-data',
					},
				});
				const imageUrl =
					'https://api.mandarin.weniv.co.kr/' + res.data.filename;
				setSelectedImage(imageUrl);
			} catch (error) {
				console.error(error);
			}
		} else {
			e.target.value = '';
		}
	};

	async function handleSaveButtonClick(e) {
		const productData = {
			product: {
				itemName: productName,
				price: parseInt(productPrice.replace(/[₩,]/g, '')),
				link: salesLink,
				itemImage: selectedImage,
			},
		};
		try {
			const res = await axios({
				method: 'POST',
				url: 'https://api.mandarin.weniv.co.kr/product',
				data: productData,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			setShowToast(true);
			setTimeout(() => {
				navigate('/myProfile');
			}, 1000);
		} catch (error) {
			console.error(error.response);
		}
	}

	function handleProductNameChange(e) {
		const productNameValue = e.target.value;
		setProductName(productNameValue);

		if (productNameValue.length < 2 || productNameValue.length > 15) {
			setProductNameError('2 ~ 15자 사이로 입력해주세요.');
		} else {
			setProductNameError('');
		}
	}

	function handlePriceChange(e) {
		const productPriceValue = e.target.value;
		const numericPrice = parseInt(productPriceValue.replace(/[^0-9]+/g, ''));
		const convertedPrice = numericPrice.toLocaleString('ko-KR', {
			style: 'currency',
			currency: 'KRW',
		});

		if (isNaN(numericPrice)) {
			setProductPrice('');
		} else {
			setProductPrice(convertedPrice);
		}
	}

	function handleSalesLinkChange(e) {
		const salesLinkValue = e.target.value;
		setSalesLink(salesLinkValue);
		const urlPatterns =
			/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

		if (!urlPatterns.test(salesLinkValue)) {
			setSalesLinkError('유효한 URL을 입력해주세요.');
		} else {
			setSalesLinkError('');
		}
	}

	const Toast = () => {
		const handleCloseToast = () => {
			setShowToast(false);
		};
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

	return (
		<>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<SaveButton disabled={!isFormValid} onClick={handleSaveButtonClick}>
					저장
				</SaveButton>
				<Toast />
			</NavbarWrap>

			<ProductContainer>
				<Upload>
					<UploadImageBtn src={UploadButton} alt='업로드버튼' />
					<LabelStyle htmlFor='bg-btn'>이미지 등록</LabelStyle>
					<BgBtnInputStyle
						id='bg-btn'
						type='file'
						onChange={handleImageInputChange}
					/>
					<BgBtnCover>
						{selectedImage ? (
							<UploadImage src={selectedImage} />
						) : (
							<Incorrect>이미지를 등록해주세요</Incorrect>
						)}
					</BgBtnCover>
				</Upload>
				<InputWrap>
					<InputList>
						<LabelStyle htmlFor='product-name'>상품명</LabelStyle>
						<InputStyle
							id='product-name'
							type='text'
							placeholder='2 ~ 15자 이내여야 합니다.'
							value={productName}
							onChange={handleProductNameChange}
						/>
						{productNameError && <Incorrect>{productNameError}</Incorrect>}
					</InputList>
					<InputList>
						<LabelStyle htmlFor='product-price'>가격</LabelStyle>
						<InputStyle
							id='product-price'
							type='text'
							value={productPrice}
							placeholder='숫자만 입력 가능합니다.'
							onChange={handlePriceChange}
						/>
					</InputList>
					<InputList>
						<LabelStyle htmlFor='sales-link'>판매 링크</LabelStyle>
						<InputStyle
							id='sales-link'
							type='url'
							placeholder='URL을 입력해 주세요.'
							value={salesLink}
							onChange={handleSalesLinkChange}
						/>
						{salesLinkError && <Incorrect>{salesLinkError}</Incorrect>}
					</InputList>
				</InputWrap>
			</ProductContainer>
		</>
	);
}
