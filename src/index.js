import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppMobile from './mobile/AppMobile';
import './fonts/fonts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppMobile />
	</React.StrictMode>
);
