import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import useFetchData from "../../hooks/useFetchData";
import { createERC721Contract } from "../../services/contract";
import { TokenData } from "../../services/covalent";
import fetchTokenURI, { Metadata } from "../../services/fetchTokenURI";
import EtherscanLink from "../EtherscanLink";
import NFTTransferButton from "./NFTTransferButton";

function CenteredLoadingIndicator() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export type NFTCardContentProps = TokenData & {
  contract: ReturnType<typeof createERC721Contract>;
};

function NFTCardMetadata({ tokenURI }: { tokenURI: string }) {
  const callFetchTokenURI = useCallback(
    () => fetchTokenURI(tokenURI),
    [tokenURI]
  );

  const {
    data: metadata,
    loading,
    error,
    fetchData,
  } = useFetchData<Metadata>(callFetchTokenURI);

  if (error) {
    return <Button onClick={fetchData}>Reload image</Button>;
  }

  if (loading || !metadata) {
    return <CenteredLoadingIndicator />;
  }

  return <CardMedia component="img" height="335" image={metadata.image} />;
}

function NFTDataRow({
  title,
  label,
}: {
  title: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>{title}</Typography>
      <Typography>{label}</Typography>
    </Box>
  );
}

function NFTCardContent({
  contract,
  tokenId,
  contractAddress,
}: NFTCardContentProps) {
  const callFetchTokenURI = useCallback(
    () => contract.getTokenURI(tokenId),
    [tokenId, contract]
  );

  const {
    data: tokenURI,
    loading,
    error,
    fetchData,
  } = useFetchData<string>(callFetchTokenURI);

  if (error) {
    return <Button onClick={fetchData}>Reload</Button>;
  }

  if (loading || !tokenURI) {
    return <CenteredLoadingIndicator />;
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tokenURI ? <NFTCardMetadata tokenURI={tokenURI} /> : null}
      </Box>
      <CardContent
        sx={{
          height: "128px",
        }}
      >
        <Stack direction="column" spacing={1}>
          <NFTDataRow title={`Token Id:`} label={`#${tokenId}`} />
          <NFTDataRow
            title={`Contract:`}
            label={<EtherscanLink address={contractAddress} />}
          />
          <NFTDataRow
            title={`Metadata:`}
            label={
              <Link href={tokenURI} target="_blank" rel="noopener">
                Open link
              </Link>
            }
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: 0 }} disableSpacing>
        <NFTTransferButton contract={contract} tokenId={tokenId} />
      </CardActions>
    </>
  );
}

export default function NFTCard(props: NFTCardContentProps) {
  return (
    <Card
      sx={{
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NFTCardContent {...props} />
    </Card>
  );
}
