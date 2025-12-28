import { createContext } from 'react';

type AuthContextType = 'guestUser' | 'loggedInUser' | 'verifiedUser';
export const AuthContext = createContext<AuthContextType>('guestUser');