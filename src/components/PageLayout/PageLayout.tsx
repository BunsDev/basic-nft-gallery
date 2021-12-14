import { Box, Container, Stack } from "@mui/material";
import styled from "@emotion/styled";

import NavBar from "./NavBar";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack sx={{ height: "100vh" }}>
      <NavBar />
      <Offset />
      <Container maxWidth="xl" sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Container>
    </Stack>
  );
}
