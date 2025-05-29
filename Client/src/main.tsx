import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrimeReactProvider } from "primereact/api";
import './index.css'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>,
)
