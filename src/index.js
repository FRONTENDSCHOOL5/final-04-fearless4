import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppMobile from './mobile/AppMobile';
import './fonts/fonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={queryClient}>
		<React.StrictMode>
			<AppMobile />
		</React.StrictMode>
	</QueryClientProvider>
);
