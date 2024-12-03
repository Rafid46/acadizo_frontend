/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, ReactNode } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
  updateUserAvatar: (photoURL: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  setLoading: (loading: boolean) => void;
  auth: any;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  //   create user
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   sign in
  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (name: string) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
      });
    } else {
      console.warn("No authenticated user found for updating profile");
      return Promise.reject("No user found");
    }
  };

  const updateUserAvatar = (imageUrl: string) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        photoURL: imageUrl,
      });
    } else {
      console.warn("No authenticated user found for updating profile");
      return Promise.reject("No user found");
    }
  };

  // google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user ---->", currentUser?.displayName);
      console.log("current user data ---->", currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);
  const authInfo: AuthContextType = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    updateUserAvatar,
    googleSignIn,
    auth,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
