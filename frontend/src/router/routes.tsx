import App from '@/App.tsx';
import Register from '@/pages/auth/register';
import Guest from '@/pages/guest.tsx';
import Login from '@/pages/auth/login';
import ProtectedRoute from '@/lib/protected-route.tsx';
import Error404 from '@/pages/error-404.tsx';
import { VerifyEmailByOTP } from '@/pages/auth/verify-email-by-OTP';
import EntriesMain from '@/pages/entries/entries-main.tsx';
import { createBrowserRouter } from 'react-router';
import { useContext } from 'react';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <ProtectedRoute />,
		children: [
			{
				path: 'guest',
				element: <Guest />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'login',
				element: <Login canRegister />,
			},
		],
	},
	{
		path: '/verify',
		element: <ProtectedRoute />,
		children: [
			{
				path: 'otp',
				element: (
					<App>
						<VerifyEmailByOTP />
					</App>
				),
			},
		],
	},
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				element: (
					<App>
						<EntriesMain />
					</App>
				),
			},
		],
	},
	{
		path: '*',
		element: <Error404 />,
	},
]);