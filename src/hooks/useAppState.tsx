import React, { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { fetchTokens, TokenData } from "../services/covalent";
import { EXAMPLE_ACCOUNT } from "../config/constants";

export interface AppStateContextType {
  // setExampleAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
  exampleAccount: string | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  tokens: TokenData[] | undefined;
  error: Error | undefined;
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;

  toggleExampleAccount: () => void;
  getTokens: (appAccount: string) => Promise<void>;
}

const AppStateContext = React.createContext<AppStateContextType>(null!);

export function useAppState() {
  return useContext(AppStateContext);
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const { error } = useWeb3React();

  const [exampleAccount, setExampleAccount] = useState<string | undefined>(
    undefined
  );

  const [tokens, setTokens] = useState<TokenData[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [appError, setAppError] = useState<Error>();

  const toggleExampleAccount = useCallback(() => {
    setTokens(undefined);
    if (exampleAccount) {
      return setExampleAccount(undefined);
    }

    return setExampleAccount(EXAMPLE_ACCOUNT);
  }, [exampleAccount]);

  const getTokens = useCallback((appAccount: string) => {
    setLoading(true);
    setAppError(undefined);

    return fetchTokens(appAccount)
      .then((nfts) => {
        // TODO: isMounted
        setTokens(nfts);
        setLoading(false);
      })
      .catch((error) => setAppError(error));
  }, []);

  useEffect(() => {
    // Have one error for the whole app
    if (!appError && error) {
      setAppError(error);
    }
  }, [error, setAppError, appError]);

  return (
    <AppStateContext.Provider
      value={{
        toggleExampleAccount,
        getTokens,
        exampleAccount,
        error: appError,
        setError: setAppError,
        loading,
        tokens,
        setLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
