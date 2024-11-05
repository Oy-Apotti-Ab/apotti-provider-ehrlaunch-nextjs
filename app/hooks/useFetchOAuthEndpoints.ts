"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface OAuthEndpoints {
  authorize: string | null;
  token: string | null;
}

export const useFetchOAuthEndpoints = (): OAuthEndpoints => {  // Note: changed to named export
  const [oauthEndpoints, setOauthEndpoints] = useState<OAuthEndpoints>({
    authorize: null,
    token: null,
  });
  console.log("OAuth Endpoints:", oauthEndpoints);
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_FHIR_SERVER as string);
        const extensions = response.data?.rest?.[0]?.security?.extension?.[0]?.extension;

        if (extensions) {
          const authorize = extensions.find((ext: { url: string }) => ext.url === "authorize")?.valueUri;
          const token = extensions.find((ext: { url: string }) => ext.url === "token")?.valueUri;
          setOauthEndpoints({ authorize, token });
        }
      } catch (error) {
        console.error("Error fetching OAuth metadata:", error);
      }
    };

    if (!oauthEndpoints.authorize || !oauthEndpoints.token) {
      fetchMetadata();
    }
  }, [oauthEndpoints]);

  return oauthEndpoints;
};
