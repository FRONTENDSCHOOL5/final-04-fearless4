import { accessInstance } from './axiosInstance';

export const getProduct = async (accountname) => {
	try {
		const res = await accessInstance.get(
			`product/${accountname}/?limit=infinity`
		);
		return res.data.product;
	} catch (error) {
		console.error(error);
	}
};

export const deleteProduct = async (selectedProduct) => {
	try {
		const res = await accessInstance.delete(`product/${selectedProduct.id}`);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const editProduct = async (selectedProduct, data) => {
	try {
		const res = await accessInstance.put(`product/${selectedProduct}`, data);
	} catch (error) {
		console.error(error);
	}
};

export const registrationProduct = async (data) => {
	try {
		const res = await accessInstance.post(`product`, data);
	} catch (error) {
		console.error(error);
	}
};
