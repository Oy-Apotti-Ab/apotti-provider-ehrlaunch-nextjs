"use client"

import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context value
interface OAuthContextType {
  authorizeUrl: string | null;
  tokenUrl: string | null;
  setAuthorizeUrl: React.Dispatch<React.SetStateAction<string | null>>; // Add setter type
  setTokenUrl: React.Dispatch<React.SetStateAction<string | null>>;       // Add setter type
}

// Create the context
const OAuthContext = createContext<OAuthContextType | null>(null);

// Export the custom hook
export const useOAuth = () => {
  const context = useContext(OAuthContext);
  if (!context) {
    throw new Error('useOAuth must be used within an OAuthProvider');
  }
  return context;
};

export const OAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authorizeUrl, setAuthorizeUrl] = useState<string | null>(process.env.NEXT_PUBLIC_FHIR_SERVER_A || null);
  const [tokenUrl, setTokenUrl] = useState<string | null>(process.env.NEXT_PUBLIC_FHIR_SERVER_TOKEN || null);

  return (
    <OAuthContext.Provider value={{ authorizeUrl, tokenUrl, setAuthorizeUrl, setTokenUrl }}>
      {children}
    </OAuthContext.Provider>
  );
};



// "use client";

// import { createContext, useContext } from 'react';

// // Define the types
// interface OAuthContextType {
//   authorizeUrl: string | null;
//   tokenUrl: string | null;
//   fetchOAuthUrls: () => void; // You can keep this function as a placeholder for the future
// }

// // Create context
// const OAuthContext = createContext<OAuthContextType | undefined>(undefined);

// // Hook to access OAuth context
// export const useOAuth = () => {
//   const context = useContext(OAuthContext);
//   if (!context) {
//     throw new Error('useOAuth must be used within an OAuthProvider');
//   }
//   return context;
// };

// // Provider component
// export const OAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // Hardcoded OAuth URLs
//   const authorizeUrl = process.env.NEXT_PUBLIC_FHIR_SERVER_A || null;
//   const tokenUrl = process.env.NEXT_PUBLIC_FHIR_SERVER_TOKEN || null;

//   // Placeholder for the fetchOAuthUrls function
//   const fetchOAuthUrls = () => {
//     console.log("OAuth URLs are hardcoded");
//   };

//   return (
//     <OAuthContext.Provider value={{ authorizeUrl, tokenUrl, fetchOAuthUrls }}>
//       {children}
//     </OAuthContext.Provider>
//   );
// };



// "use client";

// import { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// // Define the types
// interface OAuthExtension {
//   url: string;
//   extension: Array<{
//     url: string;
//     valueUri: string;
//   }>;
// }

// interface CapabilityStatement {
//   rest: Array<{
//     security: {
//       extension: OAuthExtension[];
//     };
//   }>;
// }

// interface OAuthContextType {
//   authorizeUrl: string | null;
//   tokenUrl: string | null;  // Add token URL
//   fetchOAuthUrls: (iss: string) => Promise<void>;
// }

// // Create context
// const OAuthContext = createContext<OAuthContextType | undefined>(undefined);

// // Hook to access OAuth context
// export const useOAuth = () => {
//   const context = useContext(OAuthContext);
//   if (!context) {
//     throw new Error('useOAuth must be used within an OAuthProvider');
//   }
//   return context;
// };

// // Provider component
// export const OAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [authorizeUrl, setAuthorizeUrl] = useState<string | null>(null);
//   const [tokenUrl, setTokenUrl] = useState<string | null>(null); // Add token URL state
// console.log("1-OAuthProvider");
//   // Function to fetch OAuth URLs
//   const fetchOAuthUrls = async (iss: string) => {
//     try {
//         console.log("2-fetchOAuthUrls");
//       // Fetch the CapabilityStatement from the FHIR server
    
//       const { data } = await axios.get<CapabilityStatement>(`${iss}/metadata`);
// console.log("3-data", data);
//       // Find the OAuth URIs in the CapabilityStatement
//       const oauthExtension = data.rest[0].security.extension.find((ext: OAuthExtension) => 
//         ext.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris'
//       );

//       if (oauthExtension) {
//         // Fetch the authorize URL
//         const authorize = oauthExtension.extension.find((ext) => ext.url === 'authorize');
//         if (authorize) {
//           setAuthorizeUrl(authorize.valueUri);
//         }

//         // Fetch the token URL
//         const token = oauthExtension.extension.find((ext) => ext.url === 'token');
//         if (token) {
//           setTokenUrl(token.valueUri);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching FHIR OAuthUrls:', error);
//     }
//   };

//   return (
//     <OAuthContext.Provider value={{ authorizeUrl, tokenUrl, fetchOAuthUrls }}>
//       {children}
//     </OAuthContext.Provider>
//   );
// };
