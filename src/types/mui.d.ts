import { Theme as MuiTheme, Mixins } from "@mui/material/styles";

// Source: https://stackoverflow.com/a/70085455
declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    mixins: Mixins;
  }
}
