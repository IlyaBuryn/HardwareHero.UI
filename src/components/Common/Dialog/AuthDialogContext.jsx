import React, { createContext, useContext, useState } from 'react';

const AuthDialogContext = createContext();

export const AuthDialogProvider = ({ children }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <AuthDialogContext.Provider value={{ isSignInModalOpen, setIsSignInModalOpen, isSignUpModalOpen, setIsSignUpModalOpen }}>
      {children}
    </AuthDialogContext.Provider>
  );
};

export const useAuthDialog = () => {
  return useContext(AuthDialogContext);
};
