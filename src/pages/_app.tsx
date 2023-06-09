import Head from "next/head";
import "@/styles/globals.css";
import { foundry } from "wagmi/chains";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "react-query";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";

import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import {
  injectedWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import Default from "@/components/layouts/Default";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, foundry],
  [publicProvider()]
);

const queryClient = new QueryClient();

const projectId = "Soundverse";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Head>
            <title>T</title>
            <meta name="description" content="TODO" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Default>
            <main>
              <Component {...pageProps} />
            </main>
          </Default>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

export default App;
