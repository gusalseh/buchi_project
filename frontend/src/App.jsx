import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './routes/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </div>
  );
}

export default App;
