import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import AuthProvider from './providers/AuthProvider';
import ImageProvider from './providers/ImagePorvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ImageProvider>
        <App />
      </ImageProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
