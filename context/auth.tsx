"use client";

import {
  GoogleAuthProvider,
  ParsedToken,
  signInWithPopup,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "@/firebase/client";
import { removeToken, setToken } from "./action";
import { useRouter } from "next/navigation";

type AuthContextType = {
  currentUser: User | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  // custom claims for admin role
  customClaims: ParsedToken | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user ?? null);

      if (user) {
        let tokenResult = await user.getIdTokenResult();
        let claims = tokenResult.claims;

        const isAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL === user.email;

        // 👉 If admin but claim not present yet, wait and refresh token
        if (isAdminEmail && !claims?.admin) {
          console.log("Admin claim not yet set. Waiting for server...");

          for (let i = 0; i < 3; i++) {
            await new Promise((res) => setTimeout(res, 1000));
            await user.getIdToken(true);
            tokenResult = await user.getIdTokenResult();
            claims = tokenResult.claims;

            if (claims?.admin) {
              console.log("Admin claim detected.");
              break;
            }
          }

          if (claims?.admin) {
            router.refresh(); // Refresh the page/UI
          }
        }

        setCustomClaims(claims ?? null);

        const token = tokenResult.token;
        const refreshToken = user.refreshToken;

        if (token && refreshToken) {
          await setToken({
            token,
            refreshToken,
          });
        }
      } else {
        await removeToken();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await auth.signOut();
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    // Optional: Remove this if you don't want popup every time
    provider.setCustomParameters({
      prompt: "select_account",
    });

    await signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        loginWithGoogle,
        customClaims,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
