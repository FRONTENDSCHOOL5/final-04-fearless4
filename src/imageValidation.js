import axios from 'axios';

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
		const formData = new FormData();
		formData.append('image', imageFile);
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
	} else {
		e.target.value = '';
	}
};

export default imageValidation;
