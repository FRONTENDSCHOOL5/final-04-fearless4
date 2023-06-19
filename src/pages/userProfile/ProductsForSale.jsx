import React from 'react';
import alpaca from '../../assets/image/alpaca.png';
import canoe from '../../assets/image/canoe.png';
import snoopyGarden from '../../assets/image/snoopy-garden.png';
import ItalianVillage from '../../assets/image/Italian-village.png';
import {
	WrapAll,
	Title,
	Scroll,
	ProductsContainer,
	ProductList,
	ProductImg,
	ProductName,
	ProductPrice,
} from './productsForSale.style';

export default function ProductsForSale() {
	return (
		<>
			<WrapAll>
				<Title>함께 떠나는 상품</Title>
				<Scroll>
					<ProductsContainer>
						<ProductList>
							<ProductImg src={alpaca} />
							<ProductName>알파카 월드</ProductName>
							<ProductPrice>18,000원</ProductPrice>
						</ProductList>
						<ProductList>
							<ProductImg src={canoe} />
							<ProductName>춘천중도물레길</ProductName>
							<ProductPrice>30,000원</ProductPrice>
						</ProductList>
						<ProductList>
							<ProductImg src={snoopyGarden} />
							<ProductName>스누피 가든</ProductName>
							<ProductPrice>18,000원</ProductPrice>
						</ProductList>
						<ProductList>
							<ProductImg src={ItalianVillage} />
							<ProductName>이탈리아 마을</ProductName>
							<ProductPrice>16,000원</ProductPrice>
						</ProductList>
					</ProductsContainer>
				</Scroll>
			</WrapAll>
		</>
	);
}
