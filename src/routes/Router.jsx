import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Splash = lazy(() => import('../pages/splash/Splash'));
const Login = lazy(() => import('../pages/login/Login'));
const ProfileSetup = lazy(() => import('../pages/profileSetup/ProfileSetup'));

const renderLoader = () => <span>로딩중...</span>;

export default function Router() {
	return (
		<BrowserRouter basename=''>
			<Suspense fallback={renderLoader()}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/profileSetup' element={<ProfileSetup />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
