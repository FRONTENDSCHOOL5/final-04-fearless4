import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginEmail from '../pages/loginEmail/LoginEmail';

const Splash = lazy(() => import('../pages/splash/Splash'));
const Login = lazy(() => import('../pages/login/Login'));
const ProfileSetup = lazy(() => import('../pages/profileSetup/ProfileSetup'));
const Signup = lazy(() => import('../pages/loginEmail/Signup'));
const UserProfile = lazy(() => import('../pages/userProfile/UserProfile'));
const MYProfile = lazy(() => import('../pages/userProfile/MyProfile'));
const Followers = lazy(() => import('../pages/follow/Followers'));

const renderLoader = () => <span>로딩중...</span>;

export default function Router() {
	return (
		<BrowserRouter basename=''>
			<Suspense fallback={renderLoader()}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/profileSetup' element={<ProfileSetup />} />
					<Route path='/loginEmail' element={<LoginEmail />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/userProfile' element={<UserProfile />}></Route>
					<Route path='/myProfile' element={<MYProfile />}></Route>
					<Route path='/followers' element={<Followers />}></Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
