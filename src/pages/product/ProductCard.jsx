import React from 'react';
import {
	ProductName,
	ProductPrice,
} from '../userProfile/productsForSale.style';
import { OptionModalTab } from '../../components/navbar/navbar.style';
import {
	CloseIconImg,
	CloseIconText,
	ProductCardClose,
	ProductCardContainer,
	ProductCardImg,
} from './productCard.style';
import closeIcon from '../../assets/icon/icon-close.svg';

export default function ProductCard({ item, handleCard, handleModal }) {
	return (
		<>
			<ProductCardImg
				src={item.itemImage}
				alt={`${item.itemNamd}의 상품 이미지`}
			/>
			<ProductCardContainer>
				<ProductName style={{ marginLeft: '10px', fontWeight: 'bold' }}>
					{item.itemName}
				</ProductName>
				<OptionModalTab onClick={(e, boolean) => handleModal(e, true)} />
			</ProductCardContainer>

			<ProductPrice style={{ marginLeft: '10px', marginTop: '8px' }}>
				{item.price.toLocaleString()}원
			</ProductPrice>
			<ProductCardClose onClick={(boolean) => handleCard(false)}>
				<CloseIconImg src={closeIcon} alt='닫기' />
				<CloseIconText>닫기</CloseIconText>
			</ProductCardClose>
		</>
	);
}
