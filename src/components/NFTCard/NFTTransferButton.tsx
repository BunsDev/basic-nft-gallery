import { LoadingButton } from "@mui/lab";
import { isAddress } from "@ethersproject/address";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Formik, FormikConfig } from "formik";
import * as Yup from "yup";
import type { NFTCardContentProps } from "./NFTCard";

const validationSchema = Yup.object().shape({
  to: Yup.string()
    .required("Address is required")
    .test("isAddress", "You have to provide a valid address", (value) =>
      value ? isAddress(value) : false
    ),
});

interface FormValues {
  to: string;
}

export default function NFTTransferButton({
  contract,
  tokenId,
}: Pick<NFTCardContentProps, "contract" | "tokenId">) {
  const [done, setDone] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();

  const transfer = useCallback(
    (to: string) => {
      // TODO: isMounted
      setLoading(true);
      contract
        .transfer(to, tokenId)
        .then(() => {
          setLoading(false);
          setDone(true);
        })
        .catch((error: Error) => {
          setLoading(false);
          setError(error);
        });
    },
    [tokenId, contract]
  );

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  const initialValues: FormValues = {
    to: "",
  };

  const handleSubmit: FormikConfig<FormValues>["onSubmit"] = (values) => {
    transfer(values.to);
    handleClose();
  };

  return (
    <>
      <LoadingButton
        variant="contained"
        color={error ? "error" : done ? "success" : "primary"}
        loading={loading}
        disabled={done}
        sx={{
          width: "100%",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        size="large"
        onClick={handleButtonClick}
      >
        Transfer
      </LoadingButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transferring #{tokenId}</DialogTitle>
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            submitForm,
            isSubmitting,
            values,
            handleChange,
            touched,
            errors,
          }) => (
            <>
              <DialogContent sx={{ minWidth: "400px" }}>
                <Box sx={{ pt: 2 }}>
                  <TextField
                    fullWidth
                    name="to"
                    label="To Address"
                    value={values.to}
                    onChange={handleChange}
                    error={touched.to && Boolean(errors.to)}
                    helperText={touched.to && errors.to}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Send
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
