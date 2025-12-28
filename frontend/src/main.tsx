import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { Toaster } from './components/ui/sonner.tsx';
import { router } from '@/router/routes.tsx';
import { AuthProvider } from './lib/auth-provider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<Toaster position="top-center" />
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);
