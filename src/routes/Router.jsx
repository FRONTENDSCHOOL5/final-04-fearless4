import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProductCard from '../pages/product/ProductCard';

const LoginEmail = lazy(() => import('../pages/loginEmail/LoginEmail'));
const Splash = lazy(() => import('../pages/splash/Splash'));
const Login = lazy(() => import('../pages/login/Login'));
const ProfileSetup = lazy(() => import('../pages/profileSetup/ProfileSetup'));
const Signup = lazy(() => import('../pages/loginEmail/Signup'));
const Profile = lazy(() => import('../pages/userProfile/Profile'));
const MyProfileEdit = lazy(() => import('../pages/userProfile/MyProfileEdit'));
const Follow = lazy(() => import('../pages/follow/Follow'));
const Product = lazy(() => import('../pages/product/Product'));
const Homefeed = lazy(() => import('../pages/homeFeed/Homefeed'));
const WritePost = lazy(() => import('../pages/post/WritePost'));
const ViewPost = lazy(() => import('../pages/post/ViewPost'));
const EditPost = lazy(() => import('../pages/post/EditPost'));
const Search = lazy(() => import('../pages/search/Search'));
const ChatList = lazy(() => import('../pages/chat/ChatList'));
const Chat = lazy(() => import('../pages/chat/Chat'));
const Chat2 = lazy(() => import('../pages/chat/Chat2'));
const Page404 = lazy(() => import('../pages/page404/Page404'));

export default function Router() {
	return (
		<BrowserRouter basename=''>
			<Suspense fallback={<Splash />}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/homefeed' element={<Homefeed />}></Route>
					<Route path='/search' element={<Search />}></Route>

					<Route path='/account/' element={<Outlet />}>
						<Route path='' element={<Page404 />} />
						<Route path='*' element={<Page404 />} />
						<Route path='login/' element={<LoginEmail />} />
						<Route path='signup/' element={<Signup />} />
						<Route path='signup/profileSetup/' element={<ProfileSetup />} />
					</Route>

					<Route path='/profile/' element={<Outlet />}>
						<Route path='' element={<Page404 />} />
						<Route path='*' element={<Page404 />} />
						<Route path=':accountUsername' element={<Outlet />}>
							<Route path='' element={<Profile />} />
							<Route path='*' element={<Page404 />} />
							<Route path=':follow/' element={<Follow />}></Route>
							<Route path='edit/' element={<MyProfileEdit />} />
						</Route>
					</Route>

					<Route path='/product/' element={<Outlet />}>
						<Route path='' element={<Page404 />} />
						<Route path='*' element={<Page404 />} />
						<Route path='upload/' element={<Product />} />
						<Route path='edit/' element={<Product />} />
						<Route path='detail/' element={<ProductCard />} />
					</Route>

					<Route path='/post/' element={<Outlet />}>
						<Route path='' element={<Page404 />} />
						<Route path='*' element={<Page404 />} />
						<Route path='upload/' element={<WritePost />} />
						<Route path='view/:id' element={<ViewPost />} />
						<Route path='edit/' element={<EditPost />} />
					</Route>

					<Route path='/chat/' element={<Outlet />}>
						<Route path='' element={<ChatList />} />
						<Route path='*' element={<Page404 />} />
						<Route path='choi/' element={<Chat />} />
						<Route path='여행조아/' element={<Chat2 />} />
					</Route>

					<Route path='*' element={<Page404 />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
