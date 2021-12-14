import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useWeb3 } from "../../hooks/useWeb3";
import { formatAddress } from "../../utils/formatAddress";

export default function ConnectWalletButton() {
  const { account, activate, deactivate } = useWeb3();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    if (!account) {
      return activate();
    }
    setOpen(true);
  };

  const handleConfirmClick = () => {
    deactivate();
    handleClose();
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        {account ? formatAddress(account) : "Connect wallet"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Disconnect wallet</DialogTitle>
        <DialogContent>
          Are you sure you want to disconnect your wallet?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirmClick}
            variant="contained"
            color="error"
          >
            Disconnect
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
