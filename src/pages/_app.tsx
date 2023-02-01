import { type AppProps } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

import { MantineProvider } from "@mantine/core";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      withCSSVariables
      theme={{ colorScheme: "dark" }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
