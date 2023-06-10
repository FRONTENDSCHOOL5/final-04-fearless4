import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginEmail from '../pages/loginEmail/LoginEmail';

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
					<Route path='/loginEmail' element={<LoginEmail />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
