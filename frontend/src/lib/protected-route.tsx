import { Navigate, Outlet } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useState } from 'react';
// import { AuthContext } from './auth-context';

// export default function ProtectedRoute({ children }: { children: ReactNode }): ReactNode {
// export default function ProtectedRoute() {
export default function ProtectedRoute() {
	// let useAuth = useContext(AuthContext);
	const [userStatus, setUserStatus] = useState('');

	useEffect(() => {
		axios
			.get('https://localhost:3000/auth/verify-access', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
			})
			// .then((Response) => setUserIsVerified(Response.data[0].is_verified));
			.then((Response) => {
				if (Response.data[0].is_verified == 'true') {
					setUserStatus('verifiedUser');
				} else if (Response.data[0].is_verified == 'false') {
					setUserStatus('loggedInUser');
				} else {
					setUserStatus('guestUser');
				}
			})
			.catch((error) => {
				if (error.response && error.response.status == 401) {
					setUserStatus('guestUser');
					console.error('401 Unauthorized:', error.response.data);
				} else {
					console.error('An error occurred:', error.message);
				}
			});
		// const getAccess = async () => {
		// 	try {
		// 		const response = await axiosInstance.get('/auth/verify-access');
		// 		console.log(response.data);
		// 		if (response.data[0].is_verified == 'true') {
		// 			setUserStatus('verifiedUser');
		// 		} else if (response.data[0].is_verified == 'false') {
		// 			setUserStatus('loggedInUser');
		// 		} else {
		// 			setUserStatus('guestUser');
		// 		}
		// 	} catch (error) {
		// 		setUserStatus('guestUser');
		// 		console.debug(error);
		// 	}
		// };
		// getAccess();
		// .then((Response) => setUserIsVerified(Response.data[0].is_verified));
		console.log('userStatus:', userStatus);
	}, [userStatus]);

	// if (userStatus == 'guestUser') {
	// 	<AuthContext.Provider value={userStatus}>
	// 		<Outlet />
	// 	</AuthContext.Provider>;
	// }

	// useAuth = userStatus;

	// console.log('AuthStatus:', useAuth);

	// if (userStatus == 'verifiedUser') {
	// 	// return <Navigate to="/auth/login" replace />;
	// 	return (
	// 		// 	// 	<AuthContext.Provider value={userStatus}>
	// 		<Outlet />
	// 		// 	// 	</AuthContext.Provider>
	// 	);
	// 	// return (allowedRole = userStatus);
	// } else if (userStatus == 'loggedInUser') {
	// 	// if (allowedRole === 'verifiedUser' && useAuth !== 'verifiedUser') {
	// 	// if (allowedRole === 'loggedInUser' && useAuth === 'loggedInUser') {
	// 	// 	// return <Navigate to="/verify/otp" replace />;
	// 	// 	return <Outlet />;
	// 	// }
	// 	return <Navigate to="/verify/otp" replace />;
	// } else {
	// 	return <Navigate to="/auth/login" replace />;
	// }

	// if (useAuth == 'guestUser') {
	// 	// <AuthContext.Provider value={userStatus}>
	// 	<Outlet />;
	// 	// </AuthContext.Provider>;
	// }

	return <Outlet />;

	// if (userStatus == 'guestUser') {
	// 	const allowedRole = userStatus;
	// 	return allowedRole;
	// } else if (userStatus == 'loggedInUser') {
	// 	const allowedRole = userStatus;
	// 	return allowedRole;
	// } else if (userStatus == 'verifiedUser') {
	// 	const allowedRole = userStatus;
	// 	return allowedRole;
	// }

	// const getUserRole = (userStatus) => userStatus;

	// const userStatus = useAuthStore((state) => state.userStatus);
}

// return <Navigate to="/verify/otp" replace />;
