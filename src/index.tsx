import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProviderWrapper from './provider/ProviderWrapper';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <ProviderWrapper>
        <App />
    </ProviderWrapper>
  </React.StrictMode>
);