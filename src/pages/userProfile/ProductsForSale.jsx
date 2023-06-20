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
import {
	DarkBackground,
	ModalText,
	ModalWrap,
} from '../../components/modal/modal.style';

export default function ProductsForSale({ userAccountName }) {
	const [productData, setProductData] = useState([]);
	const [resProd, setResProd] = useState([]);
	const [isModal, setIsModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const accountname = userAccountName;
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

	const handleModalOpen = (item) => {
		console.log(item);
		setIsModal(true);
		setSelectedProduct(item);
	};

	const handleModalClose = () => {
		setIsModal(false);
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) {
			try {
				const res = await axios({
					method: 'DELETE',
					url: `${url}/product/${selectedProduct.id}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				console.log(res);
				setResProd((prevProducts) =>
					prevProducts.filter((product) => product.id !== selectedProduct.id)
				);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const viewProductOnWebsite = () => {
		const url = `https://${selectedProduct.link}`;
		window.open(url, '_blank');
	};

	useEffect(() => {
		if (resProd.length !== 0) {
			const product = resProd.map((item) => (
				<ProductList
					key={item.id}
					onClick={() => {
						handleModalOpen(item);
					}}
				>
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
			{isModal && (
				<DarkBackground onClick={handleModalClose}>
					<ModalWrap>
						<ModalText onClick={handleDeleteProduct}>삭제</ModalText>
						<ModalText>수정</ModalText>
						<ModalText onClick={viewProductOnWebsite}>
							웹사이트에서 상품 보기
						</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
		</>
	);
}
