import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Stack } from "expo-router";
import '../global.css';

// Stack navigator - we can get the latest page at the top and the oldest page at the bottom and is used for tab navigation. 

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(auth)' />
      </Stack>
    </ClerkProvider>
  )
}
