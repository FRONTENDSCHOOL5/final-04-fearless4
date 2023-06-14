import React, { useState } from 'react';
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
} from './product.style';
import { LabelStyle } from '../../components/form/form.style';
import UploadButton from '../../assets/image/profileImageUploadButton.png';
import { SaveButton } from '../../components/button/button.style';

export default function Product() {
	const [productPrice, setProductPrice] = useState('');

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

	return (
		<>
			<NavbarWrap profile>
				<Backspace />
				<SaveButton>저장</SaveButton>
			</NavbarWrap>

			<ProductContainer>
				<Upload>
					<UploadImage src={UploadButton} alt='업로드버튼' />
					<LabelStyle htmlFor='bg-btn'>이미지 등록</LabelStyle>
					<BgBtnInputStyle id='bg-btn' type='file' />
					<BgBtnCover />
				</Upload>
				<InputWrap>
					<InputList>
						<LabelStyle htmlFor='product-name'>상품명</LabelStyle>
						<InputStyle
							id='product-name'
							type='text'
							placeholder='2 ~ 15자 이내여야 합니다.'
						/>
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
						/>
					</InputList>
				</InputWrap>
			</ProductContainer>
		</>
	);
}
