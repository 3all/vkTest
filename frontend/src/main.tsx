import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/home/App.tsx'
import './index.css'
import '@vkontakte/vkui/dist/vkui.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='main_container'>
        <HomePage />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
)
