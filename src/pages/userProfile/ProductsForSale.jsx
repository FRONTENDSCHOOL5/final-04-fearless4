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
	SortedButton,
	ProductCardWrap,
} from './productsForSale.style';
import {
	CheckButtonWrap,
	CheckLogout,
	CheckModalWrap,
	CheckMsg,
	DarkBackground,
	ModalText,
	ModalWrap,
} from '../../components/modal/modal.style';
import ProductCard from '../product/ProductCard';
import noProduct from '../../assets/image/noProduct.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { deleteProduct, getProduct } from '../../api/productApi';

export default function ProductsForSale() {
	const [productData, setProductData] = useState([]);
	const [isModal, setIsModal] = useState(false);
	const [isUserModal, setIsUserModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedButton, setSelectedButton] = useState(0);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [isCard, setIsCard] = useState(false);
	const navigate = useNavigate();

	const accountUsername = useParams().accountUsername;
	const data = localStorage.getItem('userAccountName');

	const queryClient = useQueryClient();

	const { data: resProd, isLoading } = useQuery(
		['productForSale'],
		({ accountname = accountUsername ? accountUsername : data }) =>
			getProduct(accountname),
		{
			enabled: !!data,
		}
	);

	console.log(resProd);

	const deleteProductMutation = useMutation(deleteProduct, {
		onSuccess: () => {
			queryClient.invalidateQueries('productForSale');
		},
		onError: () => {
			console.error('실패');
		},
	});

	const handleModalOpen = (item) => {
		if (accountUsername === data) {
			setIsCard(true);
			setIsUserModal(true);
			setSelectedProduct(item);
		} else {
			setIsCard(true);
			setIsUserModal(false);
			setSelectedProduct(item);
		}
	};

	const createProductList = (items) => {
		return items.map((item) => (
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
	};

	useEffect(() => {
		if (!isLoading && resProd) {
			const product = createProductList(resProd);
			setProductData(product);
		}
	}, [resProd]);

	const handleShowAllProducts = () => {
		const products = createProductList(resProd);
		setProductData(products);
	};

	const handleShowRecommendedItems = () => {
		const recommendedProducts = resProd.filter((item) =>
			item.itemName.includes('[추천]')
		);
		const products = createProductList(recommendedProducts);
		setProductData(products);
	};

	const handleShowDiscountedItems = () => {
		const discountedProducts = resProd.filter((item) =>
			item.itemName.includes('[할인]')
		);
		const products = createProductList(discountedProducts);
		setProductData(products);
	};

	const handleModalClose = (e, boolean = false) => {
		if (e.target === e.currentTarget) {
			setIsCard(boolean);
			setIsModal(boolean);
		}
	};

	const handleConfirmationModalOpen = (e, boolean = true) => {
		if (e.target === e.currentTarget) {
			setIsConfirmationModalOpen(boolean);
		}
	};

	const handleConfirmationModalClose = (e, boolean = false) => {
		if (e.target === e.currentTarget) {
			setIsConfirmationModalOpen(boolean);
		}
	};

	const handleCard = (boolean) => {
		setIsCard(boolean);
	};

	const handleModal = (e, boolean) => {
		if (e.target === e.currentTarget) {
			setIsModal(boolean);
		}
	};

	const handleDeleteProduct = async () => {
		if (selectedProduct) {
			deleteProductMutation.mutate(selectedProduct);
			handleModalClose(true);
		}
	};

	const viewProductOnWebsite = () => {
		const url = `${selectedProduct.link}`;
		window.open(url, '_blank');
	};

	const goToProductEdit = () => {
		navigate('/product/edit', {
			state: {
				selectedProduct: selectedProduct,
			},
		});
	};

	return (
		<>
			{!isLoading && resProd && (
				<WrapAll>
					<Title>함께 떠나는 상품</Title>
					<SortedButton
						first
						onClick={() => {
							setSelectedButton(0);
							handleShowAllProducts();
						}}
						selected={selectedButton === 0}
					>
						# 전체 상품
					</SortedButton>
					<SortedButton
						onClick={() => {
							setSelectedButton(1);
							handleShowRecommendedItems();
						}}
						selected={selectedButton === 1}
					>
						🔥추천 상품
					</SortedButton>
					<SortedButton
						onClick={() => {
							setSelectedButton(2);
							handleShowDiscountedItems();
						}}
						selected={selectedButton === 2}
					>
						🤑할인 상품
					</SortedButton>
					<Scroll>
						<ProductsContainer>
							{productData.length > 0 ? (
								productData
							) : (
								<ProductList
									style={{
										margin: '-10px auto',
									}}
								>
									<img style={{ width: '130px' }} src={noProduct} />
									<ProductName style={{ marginTop: '2px' }}>
										해당하는 상품이 없습니다
									</ProductName>
								</ProductList>
							)}
						</ProductsContainer>
					</Scroll>
				</WrapAll>
			)}
			{isCard && (
				<>
					<DarkBackground onClick={(e) => handleModalClose(e)}>
						<ProductCardWrap>
							<ProductCard
								item={selectedProduct}
								handleCard={handleCard}
								handleModal={handleModal}
							/>
						</ProductCardWrap>

						{isModal && (
							<DarkBackground onClick={(e) => handleModalClose(e)}>
								<ModalWrap>
									{isUserModal && (
										<>
											<ModalText
												onClick={(e) => handleConfirmationModalOpen(e, true)}
											>
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
							<DarkBackground onClick={(e) => handleModalClose(e)}>
								<CheckModalWrap>
									<CheckMsg>삭제하시겠어요?</CheckMsg>
									<CheckButtonWrap>
										<CheckLogout
											onClick={(e) => handleConfirmationModalClose(e, false)}
										>
											취소
										</CheckLogout>
										<CheckLogout check onClick={handleDeleteProduct}>
											삭제
										</CheckLogout>
									</CheckButtonWrap>
								</CheckModalWrap>
							</DarkBackground>
						)}
					</DarkBackground>
				</>
			)}
		</>
	);
}
