import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import './index.css'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '398384748843-m6hh91i7bk9f2o2i0me8s542ikltnqui.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
