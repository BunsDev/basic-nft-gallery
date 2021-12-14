import { useCallback, useEffect } from "react";
import { Grid, Typography, Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useWeb3 } from "../hooks/useWeb3";
import { useAppState } from "../hooks/useAppState";
import EtherscanLink from "../components/EtherscanLink";
import NFTCard from "../components/NFTCard";

import { createERC721Contract } from "../services/contract";

export default function NFTGalleryPage() {
  const { account, library, activate, deactivate } = useWeb3();
  const { exampleAccount, error, tokens, loading, getTokens } = useAppState();

  useEffect(() => {
    activate();
    return () => {
      deactivate();
    };
  }, [activate, deactivate]);

  const appAccount = exampleAccount ?? account;

  const handleGetNFTsClick = useCallback(() => {
    if (!appAccount) return;
    getTokens(appAccount);
  }, [getTokens, appAccount]);

  if (!appAccount || !library) {
    return <Typography>Connect your wallet first</Typography>;
  }

  if (error) {
    return <Typography>An error occured</Typography>;
  }

  if (tokens === undefined || tokens.length <= 0) {
    return (
      <Stack direction="column" spacing={2}>
        <Typography>
          Your selected wallet is <EtherscanLink address={appAccount} />
        </Typography>
        {tokens !== undefined && tokens.length <= 0 ? (
          <Typography>
            You don't have any NFTs. Check out the example or click the button
            again!
          </Typography>
        ) : null}
        <LoadingButton
          variant="contained"
          loadingPosition="start"
          startIcon={`🚀`}
          color={"secondary"}
          onClick={handleGetNFTsClick}
          loading={loading}
        >
          {loading
            ? "NFTs incoming..."
            : exampleAccount
            ? "Get NFTs"
            : "Get my NFTs"}
        </LoadingButton>
      </Stack>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {tokens.map((nft) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={`${nft.contractAddress}-${nft.tokenId}`}
          >
            <NFTCard
              {...nft}
              contract={createERC721Contract(
                nft.contractAddress,
                library.getSigner()
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
