import React from 'react';
import Routing from './Routing';
import './App.scss';
import { AuthProvider } from './context/AuthContext.tsx';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
};

export default App;
