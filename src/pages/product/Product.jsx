import React, { useEffect, useState } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { SaveButton } from '../../components/button/button.style';
import {
	BgBtnCover,
	BgBtnInputStyle,
	InputList,
	InputStyle,
	InputWrap,
	ProductContainer,
	RadioCover,
	RadioInput,
	Upload,
	UploadImage,
	UploadImageBtn,
} from './product.style';
import { Incorrect, LabelStyle } from '../../components/form/form.style';
import UploadButton from '../../assets/image/profileImageUploadButton.png';
import { API_URL } from '../../api';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import imageValidation from '../../imageValidation';
import {
	Toast,
	WrongExtensionToast,
	SizeOverToast,
} from '../../components/toast/imageToast';

export default function Product() {
	// 이미지 등록
	const [selectedImage, setSelectedImage] = useState('');
	// 상품 분류 선택
	const [category, setCategory] = useState('일반');
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

	const [showToast, setShowToast] = useState(false);
	const [showWrongExtensionToast, setShowWrongExtensionToast] = useState(false);
	const [showSizeOverToast, setShowSizeOverToast] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();
	const url = API_URL;
	const token = localStorage.getItem('token');
	const selectedProduct = location.state?.selectedProduct || null;

	useEffect(() => {
		// 상품 수정 페이지로 들어온 경우
		if (selectedProduct) {
			setSelectedImage(selectedProduct.itemImage);
			setProductPrice(
				selectedProduct.price.toLocaleString('ko-KR', {
					style: 'currency',
					currency: 'KRW',
				})
			);
			setProductName(selectedProduct.itemName);
			setSalesLink(selectedProduct.link);
		}
	}, [selectedProduct]);

	useEffect(() => {
		const isFormValid =
			selectedImage !== '' &&
			productNameError === '' &&
			productPrice !== '' &&
			salesLinkError === '';
		setIsFormValid(isFormValid);
	}, [selectedImage, productNameError, productPrice, salesLinkError]);

	const handleImageInputChange = (e) => {
		imageValidation(
			e,
			setSelectedImage,
			setShowSizeOverToast,
			setShowWrongExtensionToast
		);
	};

	const handleSaveButtonClick = async (e) => {
		// 등록 또는 수정 처리
		const updatedCategory = category !== '일반' ? '[' + category + ']' : '';
		const updatedItemName = productName.replace(/^\[[^\]]*\]\s*/, '');
		const itemName = updatedCategory + ' ' + updatedItemName;

		const productData = {
			product: {
				itemName: itemName,
				price: parseInt(productPrice.replace(/[₩,]/g, '')),
				link: salesLink,
				itemImage: selectedImage,
			},
		};
		try {
			// 상품 등록인지 수정인지 확인하여 API 호출 분기 처리
			if (selectedProduct) {
				const res = await axios({
					method: 'PUT',
					url: `${url}/product/${selectedProduct.id}`,
					data: productData,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
			} else {
				const res = await axios({
					method: 'POST',
					url: `${url}/product`,
					data: productData,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
			}
			setShowToast(true);
			setTimeout(() => {
				navigate('../../profile/myProfile');
			}, 1000);
		} catch (error) {
			console.error(error.response);
		}
	};

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
			/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(\/.*)?)$/i;

		if (!urlPatterns.test(salesLinkValue)) {
			setSalesLinkError('유효한 URL을 입력해주세요.');
		} else {
			setSalesLinkError('');
		}
	}

	const handleCloseToast = () => {
		setShowToast(false);
	};

	return (
		<>
			<Helmet>
				<title>TravelUs | 상품 등록</title>
			</Helmet>
			<NavbarWrap spaceBetween>
				<Backspace
					onClick={() => {
						navigate(-1);
					}}
				/>
				<SaveButton disabled={!isFormValid} onClick={handleSaveButtonClick}>
					저장
				</SaveButton>
				<Toast showToast={showToast} handleCloseToast={handleCloseToast} />
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
					<div>
						<LabelStyle>상품 분류</LabelStyle>
						<RadioCover>
							<label>
								<RadioInput
									type='radio'
									name='category'
									value='normal'
									checked={category === '일반'}
									onChange={() => setCategory('일반')}
								/>
								일반
							</label>
							<label>
								<RadioInput
									type='radio'
									name='option'
									value='recommendation'
									checked={category === '추천'}
									onChange={() => setCategory('추천')}
								/>
								추천
							</label>
							<label>
								<RadioInput
									type='radio'
									name='option'
									value='discount'
									checked={category === '할인'}
									onChange={() => setCategory('할인')}
								/>
								할인
							</label>
						</RadioCover>
					</div>
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
				<WrongExtensionToast
					showWrongExtensionToast={showWrongExtensionToast}
				/>
				<SizeOverToast showSizeOverToast={showSizeOverToast} />
			</ProductContainer>
		</>
	);
}
