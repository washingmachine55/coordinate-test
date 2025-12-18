import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import App from './App.tsx';
import Register from './components/features/auth/register.tsx';
import Guest from './pages/guest.tsx';
import Login from './components/features/auth/login.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		// element: <div>Hello World</div>,
		element: <App />,
	},
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
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		{/* <App /> */}
	</StrictMode>
);
