// src/services/googleAuth.js

// Your Google Client ID would go here
// You'll need to create this in the Google Cloud Console
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

export const initGoogleAuth = () => {
  return new Promise((resolve) => {
    // Load the Google API script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
      });
      resolve();
    };
    document.head.appendChild(script);
  });
};

// This function handles the credential response from Google
// You'll need to send this token to your backend for verification
export const handleGoogleCredentialResponse = (response) => {
  // The ID token is in response.credential
  const idToken = response.credential;
  
  // In a real app, you would send this token to your backend
  console.log('Google ID token:', idToken);
  
  // Your backend would verify this token with Google
  // and create/update the user record in your database
  
  // For now, we're just storing it in local storage
  localStorage.setItem('googleToken', idToken);
  
  // You might want to decode the token to get user info
  // This is just a basic implementation
  // In production, the verification should happen on the server
  const base64Url = idToken.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  const { email, name, picture } = JSON.parse(jsonPayload);
  
  // Store the user info
  const userData = { email, name, picture, source: 'google' };
  localStorage.setItem('user', JSON.stringify(userData));
  
  // Redirect to home page
  window.location.href = '/home';
};

// Function to render the Google Sign-In button
export const renderGoogleButton = (elementId) => {
  window.google.accounts.id.renderButton(
    document.getElementById(elementId),
    { theme: 'outline', size: 'large', width: '100%' }
  );
};

// Function to prompt the Google One Tap UI
export const promptGoogleOneTap = () => {
  window.google.accounts.id.prompt();
};