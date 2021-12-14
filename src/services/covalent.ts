interface ErrorJSON {
  error: boolean;
  error_message: string;
  error_code: number;
}

interface Token {
  nft_data: {
    token_id: string;
    owner: string;
  }[];
  supports_erc: ("erc721" | "erc20" | "erc1155")[];
  contract_address: string;
}

interface ResultJSON {
  data: {
    items: Token[];
  };
}

export interface TokenData {
  contractAddress: string;
  tokenId: string;
  owner: string;
}

export function fetchTokens(address: string): Promise<TokenData[]> {
  return fetch(
    `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=ckey_docs`
  ).then(async (res) => {
    let json = undefined;
    try {
      json = await res.json();
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }

    if (!json) {
      throw new Error("Something went wrong");
    }

    if ((json as ErrorJSON).error) {
      const { error_message, error_code } = json;
      console.error(error_message);
      throw new Error(`Error with code #${error_code}: ${error_message}`);
    }

    const {
      data: { items: tokens },
    } = json as ResultJSON;

    return tokens
      .filter(
        ({ nft_data, supports_erc }) =>
          nft_data && supports_erc && supports_erc.includes("erc721")
      )
      .flatMap(({ contract_address, nft_data }) => {
        return nft_data.map(({ token_id, owner }) => ({
          contractAddress: contract_address,
          tokenId: token_id,
          owner,
        }));
      });
  });
}
