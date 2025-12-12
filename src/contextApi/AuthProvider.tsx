import { ReactNode, useContext, useReducer } from "react";
import { createContext } from "react";

type User = { email: string } | null;


type AuthState = { user: User; loading: boolean; error: string | null };


type AuthAction =
| { type: 'LOGIN_START' }
| { type: 'LOGIN_SUCCESS'; payload: User }
| { type: 'LOGIN_ERROR'; payload: string }
| { type: 'LOGOUT' };


const initialAuthState: AuthState = { user: null, loading: false, error: null };


function authReducer(state: AuthState, action: AuthAction): AuthState {
switch (action.type) {
case 'LOGIN_START': return { ...state, loading: true, error: null };
case 'LOGIN_SUCCESS': return { user: action.payload, loading: false, error: null };
case 'LOGIN_ERROR': return { ...state, loading: false, error: action.payload };
case 'LOGOUT': return { ...initialAuthState };
default: return state;
}
}


const AuthContext = createContext<{ state: AuthState; login: (email: string, password: string) => Promise<void>; logout: () => void } | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
const [state, dispatch] = useReducer(authReducer, initialAuthState);


const login = async (email: string, password: string) => {
dispatch({ type: 'LOGIN_START' });
await new Promise(res => setTimeout(res, 500));
if (email === 'user@example.com' && password === 'password') {
dispatch({ type: 'LOGIN_SUCCESS', payload: { email } });
} else {
dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials' });
}
};


const logout = () => dispatch({ type: 'LOGOUT' });


return <AuthContext.Provider value={{ state, login, logout }}>{children}</AuthContext.Provider>;
}


export function useAuth() {
const ctx = useContext(AuthContext);
if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
return ctx;
}