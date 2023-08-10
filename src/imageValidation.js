import axios from 'axios';
import imageCompression from 'browser-image-compression';

const imageValidation = async (
	e,
	setSelectedImage,
	setShowSizeOverToast,
	setShowWrongExtensionToast
) => {
	const allowedExtensionsRegex = /\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i;
	const maxImageSize = 10 * 1024 * 1024;
	const imageFile = e.target.files[0];
	if (imageFile) {
		if (imageFile.size > maxImageSize) {
			setShowSizeOverToast(true);
			setTimeout(() => setShowSizeOverToast(false), 3000);
			e.target.value = '';
			return;
		}
		const fileExtension = '.' + imageFile.name.split('.').pop().toLowerCase();
		if (!allowedExtensionsRegex.test(fileExtension)) {
			setShowWrongExtensionToast(true);
			setTimeout(() => setShowWrongExtensionToast(false), 3000);
			e.target.value = '';
			return;
		}

		try {
			// browser-image-compression을 사용하여 이미지 압축
			const compressedImageFile = await imageCompression(imageFile, {
				maxSizeMb: 1,
				maxWidthOrHeight: 320,
			});
			const reader = new FileReader();
			reader.readAsDataURL(compressedImageFile);
			reader.onloadend = () => {
				const base64data = reader.result;
				handlingData(base64data, setSelectedImage);
			};
		} catch (error) {
			console.error(error);
		}
	} else {
		e.target.value = '';
	}
};

// formData로 만들기
const handlingData = async (dataURL, setSelectedImage) => {
	const byteString = atob(dataURL.split(',')[1]);

	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	const blob = new Blob([ia], {
		type: 'image/jpeg',
	});
	const file = new File([blob], 'image.jpg');

	const formData = new FormData();
	formData.append('image', file);

	try {
		const res = await axios({
			method: 'POST',
			url: 'https://api.mandarin.weniv.co.kr/image/uploadfile/',
			data: formData,
			headers: {
				'Content-type': 'multipart/form-data',
			},
		});
		const imageUrl = 'https://api.mandarin.weniv.co.kr/' + res.data.filename;
		setSelectedImage(imageUrl);
	} catch (error) {
		console.error(error);
	}
};

export default imageValidation;
