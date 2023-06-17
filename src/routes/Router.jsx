import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginEmail from '../pages/loginEmail/LoginEmail';

const Splash = lazy(() => import('../pages/splash/Splash'));
const Login = lazy(() => import('../pages/login/Login'));
const ProfileSetup = lazy(() => import('../pages/profileSetup/ProfileSetup'));
const Signup = lazy(() => import('../pages/loginEmail/Signup'));
const UserProfile = lazy(() => import('../pages/userProfile/UserProfile'));
const MyProfile = lazy(() => import('../pages/userProfile/MyProfile'));
const MyProfileEdit = lazy(() => import('../pages/userProfile/MyProfileEdit'));
const Followers = lazy(() => import('../pages/follow/Followers'));
const Followings = lazy(() => import('../pages/follow/Followings'));
const Product = lazy(() => import('../pages/product/Product'));
const Homefeed = lazy(() => import('../pages/homeFeed/Homefeed'));
const WritePost = lazy(() => import('../pages/post/WritePost'));

const renderLoader = () => <span>로딩중...</span>;

export default function Router() {
	return (
		<BrowserRouter basename=''>
			<Suspense fallback={<Splash />}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/loginEmail' element={<LoginEmail />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/profileSetup' element={<ProfileSetup />} />
					<Route path='/userProfile' element={<UserProfile />}></Route>
					<Route path='/myProfile' element={<MyProfile />}></Route>
					<Route path='/MyProfileEdit' element={<MyProfileEdit />}></Route>
					<Route path='/followers' element={<Followers />}></Route>
					<Route path='/followings' element={<Followings />}></Route>
					<Route path='/Product' element={<Product />}></Route>
					<Route path='/Homefeed' element={<Homefeed />}></Route>
					<Route path='/writePost' element={<WritePost />}></Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
