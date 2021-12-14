import { AppBar, Button, Toolbar } from "@mui/material";

import { useAppState } from "../../hooks/useAppState";
import ConnectWalletButton from "../ConnectWalletButton";

export default function NavBar() {
  const { exampleAccount, toggleExampleAccount } = useAppState();

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color={exampleAccount ? "error" : "secondary"}
          onClick={() => toggleExampleAccount()}
        >
          {exampleAccount ? "Show my wallet" : "Show example"}
        </Button>
        <ConnectWalletButton />
      </Toolbar>
    </AppBar>
  );
}
