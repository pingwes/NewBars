import React, { useState, useEffect } from "react";
import { MainView } from "./MainView";
import PostHog, { PostHogProvider, usePostHog } from 'posthog-react-native'
import { useFonts } from 'expo-font';
import { Text } from 'react-native'
import { client } from './api/apollo'
import { ApolloProvider } from "@apollo/client";

export default function App() {

  const [fontsLoaded] = useFonts({'Factor-A-Medium': require('./assets/FactorA/Factor-A-Regular.ttf')});
  
  if (!fontsLoaded) {
    return <Text>Loading</Text>
  }

  return (
    <ApolloProvider client={client}>
      <PostHogProvider apiKey="phc_gYu71ObLjMdeRX2qUkuQWmLmOkuKEsTGLJzm0Gycn1a" options={{
        // PostHog API host (https://app.posthog.com by default)
        host: 'https://app.posthog.com',
      }}>
        <MainView/>
      </PostHogProvider>
    </ApolloProvider>
  );
}

