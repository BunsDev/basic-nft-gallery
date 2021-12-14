import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";

export function createERC721Contract(
  contractAddress: string,
  provider: Signer | Provider
) {
  try {
    const contractABI = [
      "function tokenURI(uint256 _tokenId) external view returns (string memory)",
      "function transfer(address to, uint amount) returns (bool)",
    ];
    const contractObject = new Contract(contractAddress, contractABI, provider);

    return {
      getTokenURI(tokenId: string): Promise<string> {
        return contractObject.tokenURI(tokenId);
      },
      transfer(to: string, tokenId: string) {
        return contractObject.transfer(to, tokenId, { gasLimit: 85000 });
      },
    };
  } catch (err) {
    throw err;
  }
}
