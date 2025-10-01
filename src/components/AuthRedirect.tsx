import { useEffect, useState } from 'react';

     export default function AuthRedirect() {
       const [status, setStatus] = useState('Redirecting to app...');
       const [showManualLink, setShowManualLink] = useState(false);
       const [deepLink, setDeepLink] = useState('');

       useEffect(() => {
         // Get the hash fragment from URL (contains access_token)
         const hash = window.location.hash.substring(1);
         const hashParams = new URLSearchParams(hash);
         const accessToken = hashParams.get('access_token');
         const refreshToken = hashParams.get('refresh_token');

         console.log('Hash params:', Object.fromEntries(hashParams.entries()));

         if (accessToken && refreshToken) {
           // Build deep link with tokens
           const link =
     `aurovamobile://auth/callback#access_token=${accessToken}&refresh_token=${refreshToken}&type=magiclink`;

           console.log('Deep link:', link);
           setDeepLink(link);

           // Try to open the app
           window.location.href = link;

           // Show manual button after 2 seconds if redirect didn't work
           setTimeout(() => {
             setStatus("App didn't open automatically?");
             setShowManualLink(true);
           }, 2000);
         } else {
           setStatus('Invalid login link. Please try again.');
         }
       }, []);

       return (
         <div className="auth-redirect-container">
           <div className="auth-redirect-content">
             {!status.includes('Invalid') && (
               <div className="spinner" />
             )}

             <h1 className="title">Opening Aurova...</h1>
             <p className="status">{status}</p>

             {showManualLink && (
               <a href={deepLink} className="manual-link">
                 Open App Manually
               </a>
             )}
           </div>

           <style>{`
             .auth-redirect-container {
               font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
               display: flex;
               align-items: center;
               justify-content: center;
               min-height: 100vh;
               margin: 0;
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
               color: white;
             }

             .auth-redirect-content {
               text-align: center;
               padding: 2rem;
             }

             .spinner {
               border: 4px solid rgba(255, 255, 255, 0.3);
               border-radius: 50%;
               border-top: 4px solid white;
               width: 40px;
               height: 40px;
               animation: spin 1s linear infinite;
               margin: 0 auto 1rem;
             }

             @keyframes spin {
               0% { transform: rotate(0deg); }
               100% { transform: rotate(360deg); }
             }

             .title {
               margin: 0 0 1rem;
               font-size: 1.5rem;
             }

             .status {
               margin: 0.5rem 0;
               opacity: 0.9;
             }

             .manual-link {
               display: inline-block;
               margin-top: 1rem;
               padding: 0.75rem 1.5rem;
               background: white;
               color: #667eea;
               text-decoration: none;
               border-radius: 8px;
               font-weight: 600;
             }

             .manual-link:hover {
               opacity: 0.9;
             }
           `}</style>
         </div>
       );
     }