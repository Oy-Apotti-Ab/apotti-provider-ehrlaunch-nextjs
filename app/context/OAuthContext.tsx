"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

// Define the shape of the context value
interface OAuthContextType {
  authorizeUrl: string | null;
  tokenUrl: string | null;
  setAuthorizeUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setTokenUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context
const OAuthContext = createContext<OAuthContextType | null>(null);

// Export the custom hook
export const useOAuth = () => {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error("useOAuth must be used within an OAuthProvider");
  }
  return context;
};

// OAuthProvider component
export const OAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authorizeUrl, setAuthorizeUrl] = useState<string | null>(null);
  const [tokenUrl, setTokenUrl] = useState<string | null>(null);

  // Fetch OAuth metadata on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        console.log("Fetching OAuth metadata via proxy API route...");
        const response = await axios.get("/api/oauth-endpoints");
        
        const { authorization_endpoint, token_endpoint } = response.data;
        setAuthorizeUrl(authorization_endpoint);
        //console.log("Authorization URL:", authorization_endpoint);
        setTokenUrl(token_endpoint);
        //console.log("Token URL:", token_endpoint);  
      } catch (error) {
        console.error("Error fetching OAuth metadata:", error);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <OAuthContext.Provider value={{ authorizeUrl, tokenUrl, setAuthorizeUrl, setTokenUrl }}>
      {children}
    </OAuthContext.Provider>
  );
};
