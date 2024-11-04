"use client"
import { useEffect } from 'react';
import axios from 'axios';

const CallbackPage = () => {
  console.log('Callback page loaded');
  useEffect(() => {
    console.log('Callback useEffect starts');
    const exchangeToken = async (code: string) => {
      try {
        const tokenUrl = process.env.NEXT_PUBLIC_FHIR_SERVER_TOKEN;
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        
        
        if (!tokenUrl) {
          throw new Error('Token URL is not defined in environment variables');
        }
        
        if (!clientId) {
          throw new Error('Client ID is not defined in environment variables');
        }
        console.log('tokenUrl',tokenUrl);
        const params = new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'http://localhost:3000/callback',
          client_id: clientId,
        });
        console.log('params',params);
        const response = await axios.post(tokenUrl, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        console.log("Token response: ", response.data);
      } catch (error) {
        console.error('Error exchanging token:', error);
      }
    };

    // Simulating retrieval of authorization code from query params
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      exchangeToken(code);
    } else {
      console.error('No authorization code found in URL');
    }
  }, []);

  return <div>OAuth2 Callback Page</div>;
};

export default CallbackPage;
