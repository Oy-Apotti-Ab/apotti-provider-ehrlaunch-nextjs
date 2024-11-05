"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

// Adjust OAuthProvider to include fetching functionality
export const OAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authorizeUrl, setAuthorizeUrl] = useState<string | null>(null);
  const [tokenUrl, setTokenUrl] = useState<string | null>(null);

  // Fetch OAuth metadata on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch("/api/oauth-endpoints");
        const data = await response.json();
        const extensions = data?.rest?.[0]?.security?.extension?.[0]?.extension;

        if (extensions) {
          const authorize = extensions.find((ext: { url: string }) => ext.url === "authorize")?.valueUri;
          const token = extensions.find((ext: { url: string }) => ext.url === "token")?.valueUri;
          setAuthorizeUrl(authorize);
          setTokenUrl(token);
        }
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
