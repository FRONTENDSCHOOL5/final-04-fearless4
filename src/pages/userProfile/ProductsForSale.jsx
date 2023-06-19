import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { API_URL } from '../../api.js';

export default function ProductsForSale() {
	const [productData, setProductData] = useState([]);
	const [resProd, setResProd] = useState([]);
	const accountname = 'TravelUs';

	const url = API_URL;
	const token = localStorage.getItem('token');

	useEffect(() => {
		async function getProductForSale() {
			const res = await axios({
				method: 'GET',
				url: `${url}/product/${accountname}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			console.log(res);
			setResProd(res.data.product);
		}
		getProductForSale();
	}, []);

	useEffect(() => {
		if (resProd.length !== 0) {
			const product = resProd.map((item) => (
				<ProductList key={item.id}>
					<ProductImg
						src={item.itemImage}
						alt={`${item.itemName}의 상품 이미지`}
					/>
					<ProductName>{item.itemName}</ProductName>
					<ProductPrice>{item.price.toLocaleString()}원</ProductPrice>
				</ProductList>
			));
			setProductData(product);
		}
	}, [resProd]);
	return (
		<>
			{resProd.length === 0 ? null : (
				<WrapAll>
					<Title>함께 떠나는 상품</Title>
					<Scroll>
						<ProductsContainer>{productData}</ProductsContainer>
					</Scroll>
				</WrapAll>
			)}
		</>
	);
}
