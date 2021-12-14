import React, { useCallback } from "react";
import { ethers } from "ethers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type TakeTail<T extends any[]> = T extends [infer H, ...infer T] ? T : never;

export function useWeb3() {
  const { activate, ...rest } = useWeb3React();

  const activateWithConnector = useCallback(
    (...args: TakeTail<Parameters<typeof activate>>) =>
      activate(injected, ...args),
    [activate]
  );

  return {
    activate: activateWithConnector,
    ...rest,
  };
}

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
}
