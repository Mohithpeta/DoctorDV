import { Navigate, Outlet  } from "react-router-dom";
import { ReactNode } from "react";

interface AuthGuardProps {
  children?: ReactNode;
}

const AuthGuard = ({children}: AuthGuardProps) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children ?<>{children}</>:<Outlet />;
    };

export default AuthGuard;