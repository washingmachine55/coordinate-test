import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import App from './App.tsx';
import Register from './components/features/auth/register.tsx';
import Guest from './pages/guest.tsx';
import Login from './components/features/auth/login.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import ProtectedRoute from './lib/protected-route.tsx';
import Error404 from './pages/error-404.tsx';

const router = createBrowserRouter([
	{
		path: '/guest',
		element: <Guest />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login canRegister />,
	},
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<App />,
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <Error404 />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Toaster position="top-center" />
		<RouterProvider router={router} />
	</StrictMode>
);
