import "@/styles/globals.css";
import React from 'react';
import type { AppProps } from "next/app";
import RootLayout from "../components/root-layout";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const ComponentElement = Component as React.ElementType; 

  return (
    <>
      <RootLayout>
        <ComponentElement {...pageProps} />
      </RootLayout>
      <div id="root" />
    </>
  );
}
