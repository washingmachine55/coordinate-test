import { Navigate, Outlet } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import App from '@/App';
import { VerifyEmailByOTP } from '@/components/features/auth/verify-email-by-OTP';
import { VerifiedContext } from './context';

// export default function ProtectedRoute({ children }: { children: ReactNode }): ReactNode {
export default function ProtectedRoute() {
	const [userIsVerified, setUserIsVerified] = useState(null);

	useEffect(() => {
		axios
			.get('/auth/verify-access', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
			})
			.then((Response) => setUserIsVerified(Response.data[0].is_verified));
	}, []);

	// console.log(userIsVerified == 'true');

	if (!localStorage.getItem('token')) {
		return <Navigate to="/login" />;
	}
	if (userIsVerified == 'false') {
		// return <Navigate to="/verify-otp" replace />;
		return (
			<App>
				<VerifyEmailByOTP />
			</App>
		);
	}

	if (userIsVerified == 'true') {
		return (
			<VerifiedContext.Provider value={userIsVerified}>
				<Outlet></Outlet>
			</VerifiedContext.Provider>
		);
	}
	// else {
	// 	return <Navigate to="/guest" replace />;
	// }
}
