import React from "react";
import { AuthProvider } from "@/hooks/useAuth";

export const AuthContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthContext;
