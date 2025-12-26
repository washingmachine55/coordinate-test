import { useContext } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children } : {children: React.ReactNode}) {

	const useAuth = useContext(AuthContext)

	return <AuthContext.Provider value={useAuth}>{children}</AuthContext.Provider>;
}