import { Link } from "@mui/material";
import { formatAddress } from "../../utils/formatAddress";

const ETHERSCAN_BASE_URL = `https://etherscan.io`;

export default function EtherscanLink({ address }: { address: string }) {
  // take first 6 and last 4 chars, join them with ...
  // always 13 chars
  // const shortenedAddress =

  return (
    <Link
      href={new URL(`/address/${address}`, ETHERSCAN_BASE_URL).toString()}
      target="_blank"
      rel="noopener"
    >
      {formatAddress(address)}
    </Link>
  );
}
