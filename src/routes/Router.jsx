import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Splash = lazy(() => import('../pages/Splash'));
const Login = lazy(() => import('../pages/Login'));

const renderLoader = () => <span>로딩중...</span>;

export default function Router() {
	return (
		<BrowserRouter basename=''>
			<Suspense fallback={<Splash />}>
				<Routes>
					<Route path='/' element={<Login />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
