import Register from '@/pages/auth/register';
import Guest from '@/pages/guest.tsx';
import Login from '@/pages/auth/login';
// import ProtectedRoute from '@/lib/protected-route.tsx';
import Error404 from '@/pages/error-404.tsx';
import { VerifyEmailByOTP } from '@/pages/auth/verify-email-by-OTP';
import EntriesMain from '@/pages/entries/entries-main.tsx';
import { Route, Routes } from 'react-router';
import Home from '@/pages/home';
import ResetPassword from '@/pages/auth/reset-password';
import ForgotPassword from '@/pages/auth/forgot-password';
import VerifyEmail from '@/pages/auth/verify-email';
import { VerifyOTP } from '@/pages/auth/verify-OTP';
import AuthLayout from '@/components/layouts/auth-layout';
// import { useContext } from 'react';

// export const router = createBrowserRouter([
// 	{
// 		path: '/auth',
// 		element: <ProtectedRoute />,
// 		children: [
// 			{
// 				path: 'guest',
// 				element: <Guest />,
// 			},
// 			{
// 				path: 'register',
// 				element: <Register />,
// 			},
// 			{
// 				path: 'login',
// 				element: <Login canRegister />,
// 			},
// 		],
// 	},
// 	{
// 		path: '/verify',
// 		element: <ProtectedRoute />,
// 		children: [
// 			{
// 				path: 'otp',
// 				element: (
// 					<App>
// 						<VerifyEmailByOTP />
// 					</App>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		path: '/',
// 		element: <ProtectedRoute />,
// 		children: [
// 			{
// 				index: true,
// 				element: (
// 					<App>
// 						<EntriesMain />
// 					</App>
// 				),
// 			},
// 		],
// 	},
// 	{
// 		path: '*',
// 		element: <Error404 />,
// 	},
// ]);

function RoutesMain() {
	return (
		<Routes>
			<Route>
				<Route path="/" Component={Home} />
				<Route path="/entries" Component={EntriesMain} />
			</Route>
			<Route>
				<Route path="/auth/guest" element={<Guest />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/auth/login" element={<Login canRegister />} />
				<Route path="/auth/reset-password" element={<ResetPassword />} />
				<Route path="/auth/forgot-password" element={<ForgotPassword />} />
				<Route path="/auth/verify-email-otp" element={<VerifyEmailByOTP />} />
				<Route path="/auth/verify-otp" element={<VerifyOTP />} />
			</Route>
			<Route>
				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	);
}

export default RoutesMain;
