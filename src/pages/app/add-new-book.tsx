import React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SaveAsIcon from "@mui/icons-material/SaveAs";

function AddNewBook() {
  return (
    <>
      <Paper variant="outlined" sx={{ padding: "2rem", display: 'flex' }}>
        <div style={{ width: "48%" }}>
          <Typography variant="h4">Add New Book</Typography>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="standard"
              margin="normal"
            />

            <TextField
              margin="normal"
              id="outlined-basic"
              label="Author"
              variant="standard"
            />

            <TextField
              margin="normal"
              id="outlined-basic"
              label="Publication"
              variant="standard"
            />

            <TextField
              margin="normal"
              id="outlined-basic"
              label="Quantity"
              variant="standard"
            />

            <TextField
              margin="normal"
              id="outlined-basic"
              label="Remarks"
              variant="standard"
            />

            <Button
              sx={{
                backgroundColor: "black!important",
                color: "white",
                marginTop: "1rem",
              }}
            >
              Save
              <SaveAsIcon sx={{ marginLeft: "0.6rem" }} />
            </Button>
          </FormControl>
        </div>

        <hr style={{transform: 'rotate(90deg) top',width: '100px'}} />
      </Paper>
    </>
  );
}

export default AddNewBook;
