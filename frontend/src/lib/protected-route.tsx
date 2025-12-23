import { Navigate } from 'react-router';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }): ReactNode {
	// export default function ProtectedRoute() {

	// var [isLoggedIn,userHasAuthenticated] = useState(false);
	// const navigate = useNavigate();

	// const userHasAuthenticated = useState(0);

	// const isLoggedIn = async () => {
	// 	try {
	// 		if (!localStorage.getItem('token')) {
	// 			return navigate('/login', { replace: true });
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	if (!localStorage.getItem('token')) {
		// return <div onLoad={() => navigate(`/login`)}></div>;
		return <Navigate to="/login" />;
	} else {
		return <div>{children}</div>;
	}
}
