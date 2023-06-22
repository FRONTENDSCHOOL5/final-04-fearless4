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
	CheckButtonWrap,
	CheckLogout,
	CheckModalWrap,
	CheckMsg,
	DarkBackground,
	ModalText,
	ModalWrap,
} from '../../components/modal/modal.style';
import { useNavigate } from 'react-router-dom';
import useMyProfile from '../../hook/useMyProfile';

export default function ProductsForSale({ userAccountName }) {
	const [productData, setProductData] = useState([]);
	const [resProd, setResProd] = useState([]);
	const [isModal, setIsModal] = useState(false);
	const [isUserModal, setIsUserModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [myProfile, setMyProfile] = useState();
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const navigate = useNavigate();
	const accountname = userAccountName;
	console.log(accountname);
	const url = API_URL;
	const token = localStorage.getItem('token');
	const data = useMyProfile();

	useEffect(() => {
		data && setMyProfile(data);
		async function getProductForSale() {
			const res = await axios({
				method: 'GET',
				url: `${url}/product/${accountname}`,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			// console.log(res);
			setResProd(res.data.product);
		}
		if (data) {
			getProductForSale();
		}
	}, [data]);

	const handleModalOpen = (item) => {
		if (accountname === myProfile.accountname) {
			setIsModal(true);
			setIsUserModal(true);
			setSelectedProduct(item);
		} else {
			setIsModal(true);
			setIsUserModal(false);
			console.log(item);
		}
	};

	const handleModalClose = () => {
		setIsModal(false);
	};

	const handleConfirmationModalOpen = () => {
		setIsConfirmationModalOpen(true);
	};

	const handleConfirmationModalClose = () => {
		setIsConfirmationModalOpen(false);
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) {
			setIsConfirmationModalOpen(false);
			try {
				const res = await axios({
					method: 'DELETE',
					url: `${url}/product/${selectedProduct.id}`,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-type': 'application/json',
					},
				});
				// console.log(res);
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
	const goToProductEdit = () => {
		navigate('/ProductsForSaleEdit', {
			state: {
				selectedProduct: selectedProduct,
			},
		});
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
						{isUserModal && (
							<>
								<ModalText onClick={handleConfirmationModalOpen}>
									삭제
								</ModalText>
								<ModalText onClick={goToProductEdit}>수정</ModalText>
							</>
						)}
						<ModalText onClick={viewProductOnWebsite}>
							웹사이트에서 상품 보기
						</ModalText>
					</ModalWrap>
				</DarkBackground>
			)}
			{isConfirmationModalOpen && (
				<DarkBackground onClick={handleModalClose}>
					<CheckModalWrap>
						<CheckMsg>삭제하시겠어요?</CheckMsg>
						<CheckButtonWrap>
							<CheckLogout onClick={handleConfirmationModalClose}>
								취소
							</CheckLogout>
							<CheckLogout check onClick={handleDeleteProduct}>
								삭제
							</CheckLogout>
						</CheckButtonWrap>
					</CheckModalWrap>
				</DarkBackground>
			)}
		</>
	);
}
