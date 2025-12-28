import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Toaster } from './components/ui/sonner.tsx';
import RoutesMain from '@/router/routes.tsx';
import { ThemeProvider } from './lib/theme-provider.tsx';
// import { AuthProvider } from './lib/auth-provider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* <AuthProvider> */}
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Toaster position="top-center" />
			<BrowserRouter>
				<RoutesMain />
			</BrowserRouter>
		</ThemeProvider>
		{/* </AuthProvider> */}
	</StrictMode>
);
