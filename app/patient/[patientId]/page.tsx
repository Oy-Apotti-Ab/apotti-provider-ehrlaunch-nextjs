"use client";
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PatientPage.css';

interface OAuthEndpoints {
  authorize?: string;
  token?: string;
}

interface Patient {
  id: string;
  name?: { text: string }[];
  birthDate?: string;
  address?: { text: string }[];
}

interface ObservationEntry {
  resource: {
    code?: { text: string };
    category?: Array<{
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    }>;
    valueQuantity?: { value: number; unit: string };
    effectiveDateTime?: string;
  };
}

export default function PatientPage() {
  const { patientId } = useParams();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');

  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [observations, setObservations] = useState<ObservationEntry[]>([]);
  const [oauthEndpoints, setOauthEndpoints] = useState<OAuthEndpoints>({});

  useEffect(() => {
    // Fetch and set OAuth endpoints from FHIR server metadata
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
        console.error("Error fetching metadata:", error);
      }
    };

    if (!oauthEndpoints.authorize || !oauthEndpoints.token) {
      fetchMetadata();
    }
  }, [oauthEndpoints]);

  useEffect(() => {
    // Automatically initiate authorization if no access token is present
    const initiateAuthorization = () => {
      if (oauthEndpoints.authorize) {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const redirectUri = window.location.origin + "/callback";
        const authUrl = `${oauthEndpoints.authorize}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        
        window.location.href = authUrl;
      }
    };

    if (!accessToken && oauthEndpoints.authorize) {
      initiateAuthorization();
    }
  }, [accessToken, oauthEndpoints]);

  useEffect(() => {
    if (patientId && accessToken) {
      // Fetch patient data and observations
      const fetchPatientData = async () => {
        try {
          const response = await axios.get(`/api/patient/${patientId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setPatientData(response.data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
        }
      };

      const fetchObservations = async () => {
        try {
          const response = await axios.get(`/api/patient/${patientId}/observations?category=vital-signs`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setObservations(response.data.entry || []);
        } catch (error) {
          console.error('Error fetching observations:', error);
        }
      };

      fetchPatientData();
      fetchObservations();
    }
  }, [patientId, accessToken]);

  if (!patientData) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Patient Info</h1>
      </div>

      {/* Patient Info Table */}
      {patientData && (
        <div className="patient-info">
          <table>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{patientData.name?.[0]?.text || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>ID:</strong></td>
                <td>{patientData.id}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth:</strong></td>
                <td>{patientData.birthDate || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Address:</strong></td>
                <td>{patientData.address?.[0]?.text || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Observations Table */}
      <div className="header">
        <h1>Observations</h1>
      </div>

      {observations.length > 0 ? (
        <div>
          <table className="observations-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Code</th>
                <th>Value</th>
                <th>Unit</th>
                <th>DateTime</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.resource.category?.[0]?.coding?.[0]?.display || 'vital-signs'}</td>
                  <td>{entry.resource.code?.text || 'N/A'}</td>
                  <td>{entry.resource.valueQuantity?.value || 'N/A'}</td>
                  <td>{entry.resource.valueQuantity?.unit || 'N/A'}</td>
                  <td>{entry.resource.effectiveDateTime ? new Date(entry.resource.effectiveDateTime).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No observations found for this patient.</p>
      )}
    </div>
  );
}




// "use client";
// import { useParams, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../styles/PatientPage.css';

// // Define interfaces
// interface Patient {
//   id: string;
//   name?: { text: string }[];
//   birthDate?: string;
//   address?: { text: string }[];
// }

// interface ObservationEntry {
//   resource: {
//     code?: { text: string };
//     category?: Array<{
//       coding: Array<{
//         system: string;
//         code: string;
//         display: string;
//       }>;
//     }>;
//     valueQuantity?: { value: number; unit: string };
//     effectiveDateTime?: string;
//   };
// }

// export default function PatientPage() {
//   const { patientId } = useParams();
//   const searchParams = useSearchParams();
//   const accessToken = searchParams.get('accessToken');

//   const [patientData, setPatientData] = useState<Patient | null>(null);
//   const [observations, setObservations] = useState<ObservationEntry[]>([]);

//   useEffect(() => {
//     if (patientId && accessToken) {
//       const fetchPatientData = async () => {
//         try {
//           const response = await axios.get(`/api/patient/${patientId}`, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           setPatientData(response.data);
//         } catch (error) {
//           console.error('Error fetching patient data:', error);
//         }
//       };

//       const fetchObservations = async () => {
//         try {
//           const response = await axios.get(`/api/patient/${patientId}/observations?category=vital-signs`, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           setObservations(response.data.entry || []);
//         } catch (error) {
//           console.error('Error fetching observations:', error);
//         }
//       };

//       fetchPatientData();
//       fetchObservations();
//     }
//   }, [patientId, accessToken]);

//   if (!patientData) return <div>Loading...</div>;

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>Patient Info</h1>
//       </div>

//       {/* Patient Info Table */}
//       {patientData && (
//         <div className="patient-info">
//           <table>
//             <tbody>
//               <tr>
//                 <td><strong>Name:</strong></td>
//                 <td>{patientData.name?.[0]?.text || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td><strong>ID:</strong></td>
//                 <td>{patientData.id}</td>
//               </tr>
//               <tr>
//                 <td><strong>Date of Birth:</strong></td>
//                 <td>{patientData.birthDate || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td><strong>Address:</strong></td>
//                 <td>{patientData.address?.[0]?.text || 'N/A'}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Observations Table */}
//       <div className="header">
//         <h1>Observations</h1>
//       </div>

//       {observations.length > 0 ? (
//         <div>
//           <table className="observations-table">
//             <thead>
//               <tr>
//                 <th>Category</th>
//                 <th>Code</th>
//                 <th>Value</th>
//                 <th>Unit</th>
//                 <th>DateTime</th>
//               </tr>
//             </thead>
//             <tbody>
//               {observations.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{entry.resource.category?.[0]?.coding?.[0]?.display || 'vital-signs'}</td>
//                   <td>{entry.resource.code?.text || 'N/A'}</td>
//                   <td>{entry.resource.valueQuantity?.value || 'N/A'}</td>
//                   <td>{entry.resource.valueQuantity?.unit || 'N/A'}</td>
//                   <td>{entry.resource.effectiveDateTime ? new Date(entry.resource.effectiveDateTime).toLocaleString() : 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No observations found for this patient.</p>
//       )}
//     </div>
//   );
// }

