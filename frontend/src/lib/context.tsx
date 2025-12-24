import { createContext } from 'react';

type VerifiedContextType = true | false;
export const VerifiedContext = createContext<VerifiedContextType>(false);