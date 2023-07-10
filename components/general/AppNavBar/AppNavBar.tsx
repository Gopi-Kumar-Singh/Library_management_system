import { Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Avatar from "../Avatar/Avatar";
import SearchBar from "../SearchBar/SearchBar";
import sidebar from "./AppNavBar.module.css";

const drawerWidth = 270;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function AppNavbar({open, rowData, setRows, searched, setSearched}) {
  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white", borderBottom: "1px solid #0000001f" }}
        elevation={0}
        className={sidebar.testBar}
      >
        <Toolbar>
          <div className={sidebar.allNavContent}>
            <Typography
              variant="h6"
              id="NavLogo"
              className={sidebar.navLogo}
              sx={{ color: "black", position: "relative" }}
            >
              L
            </Typography>
            <div
              id="NavTitle"
              className={sidebar.navBarContent}
            >
              <SearchBar rowData={rowData} setRows={setRows} searched={searched} setSearched={setSearched}/>
              <Avatar />
            </div>
          </div>
          {/*--------------------------------------Navbar content -------------------------------------  */}
        </Toolbar>
      </AppBar>
    </>
  );
}
