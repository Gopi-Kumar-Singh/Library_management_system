import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppStructure from "../../components/general/AppStructure/AppStructure";
import { useEffect, useState } from "react";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer(props: any) {
  const [searched, setSearched] = useState<string>("");
  const [rows, setRows] = useState([]);
  const [rowData, setRowData] = useState([]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppStructure
          rowData={rowData}
          setRows={setRows}
          searched={searched}
          setSearched={setSearched}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
          <DrawerHeader />

          {props.children}
        </Box>
      </Box>
    </>
  );
}
