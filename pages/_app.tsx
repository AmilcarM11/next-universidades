import '../styles/globals.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
