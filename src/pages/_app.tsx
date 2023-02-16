import { type AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { api } from "../utils/api";

import "../styles/globals.css";

import { MantineProvider } from "@mantine/core";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        withCSSVariables
        theme={{
          colorScheme: "dark",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <Analytics />
    </main>
  );
};

export default api.withTRPC(MyApp);
