
import './global.css'
import { Toaster } from 'sonner'
import { RouterProvider } from "react-router-dom"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey='pizzashop-theme'>
    <HelmetProvider>
      <Helmet titleTemplate='%s | Pizza Shop' />
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} /> 
      </QueryClientProvider>
    </HelmetProvider>
    </ThemeProvider>
  )
}

export default App
