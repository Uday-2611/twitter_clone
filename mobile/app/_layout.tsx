import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from "expo-router";
import {StatusBar} from 'expo-status-bar';
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Stack navigator - we can get the latest page at the top and the oldest page at the bottom and is used for tab navigation. 

const queryClient = new QueryClient()

export default function RootLayout() {
  
  return (
    <ClerkProvider tokenCache={tokenCache} >
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(auth)' />
          <Stack.Screen name='(tabs)' />
        </Stack>

        <StatusBar style='dark' />
      </QueryClientProvider>
    </ClerkProvider>
  )
}
