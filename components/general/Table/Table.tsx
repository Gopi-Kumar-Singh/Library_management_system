import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TablePagination,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import loadConfig from "next/dist/server/config";

function Row({
  row,
  setDialogOpen,
  setIdOfEditableRow,
}: {
  row: any;
  setDialogOpen: any;
  setIdOfEditableRow: any;
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <TableRow id={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          {row.titleOfBook}
        </TableCell>
        <TableCell>{row.author}</TableCell>
        <TableCell>{row.noOfCopies}</TableCell>
        {/* <TableCell>{row.date}</TableCell> */}
        <TableCell>{row.remarks}</TableCell>

        <TableCell>
          <Box className="flex justify-center">
            <IconButton onClick={() => setIdOfEditableRow(row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleOpen}>
              <PublishIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
}

function EditableRow({
  row,
  setDialogOpen,
  setIdOfEditableRow,
  idOfEditableRow,
}: {
  row: any;
  setDialogOpen: any;
  setIdOfEditableRow: any;
  idOfEditableRow: any;
}) {
  const [open, setOpen] = useState(false);
  let updatedValues = {};
  const [confirmSaveDialogOpen, setConfirmSaveDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    valueRefillHandler();
  }, [idOfEditableRow]);

  const valueRefillHandler = () => {
    document.getElementById("titleInput")!.value = row.titleOfBook;
    document.getElementById("authorInput")!.value = row.author;
    document.getElementById("quantityInput")!.value = row.noOfCopies;
    document.getElementById("remarksInput")!.value = row.remarks;

    return;
  };

  // dialog

  const confirmSaveDialogOpenHandler = () => {
    setConfirmSaveDialogOpen(true);
  };

  const confirmSaveDialogCloseHandler = () => {
    setConfirmSaveDialogOpen(false);
  };

  const confirmDeleteDialogOpenHandler = () => {
    setConfirmDeleteDialogOpen(true);
  }
  const confirmDeleteDialogCloseHandler = () => {
    setConfirmDeleteDialogOpen(false)
  }



  const updatedValuesSubmitHandler = async () => {
    let titleOfBook = document.getElementById("titleInput")!.value;
    let author = document.getElementById("authorInput")!.value;
    let noOfCopies = document.getElementById("quantityInput")!.value;
    let remarks = document.getElementById("remarksInput")!.value;
    let id = row.id;

    updatedValues = { id, titleOfBook, author, noOfCopies, remarks };

    try {
      const response = await fetch("/api/edit-form", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });
      const data = await response.json();

      if (data.message === "success") {
        window.location.reload();
      }
      else {
        alert('there was some error while saving the changes, please try again')
        return;
      }
      
    } catch (err) {
      alert('there was some error while saving the changes, please try again')
      return;
    }
    
    setConfirmSaveDialogOpen(false);
    setIdOfEditableRow(null);

  };


  const bookDeleteHandler = async () => {
    try {
      const id = row.id
      const response = await fetch("/api/edit-form", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      const data = await response.json();

      if (data.message === "success") {
        window.location.reload();
      }
      else {
        alert('there was some error while saving the changes, please try again')
        return;
      }
      
    } catch (err) {
      alert('there was some error while saving the changes, please try again')
      return;
    }
  }

  return (
    <>
      <Dialog
        open={confirmSaveDialogOpen}
        onClose={confirmSaveDialogCloseHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to save the changes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            These changes will be permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            autoFocus
            onClick={confirmSaveDialogCloseHandler}
          >
            cancel
          </Button>
          <Button onClick={updatedValuesSubmitHandler} autoFocus>
            save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDeleteDialogOpen}
        onClose={confirmDeleteDialogCloseHandler}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to Delete this book?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            These changes will be permanent
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="warning"
            autoFocus
            onClick={confirmDeleteDialogCloseHandler}
          >
            cancel
          </Button>
          <Button onClick={bookDeleteHandler} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{row.id}</TableCell>

        <TableCell component="th" scope="row">
          <TextField
            label="Title of book"
            type="text"
            fullWidth
            variant="standard"
            id="titleInput"
          />
        </TableCell>

        <TableCell>
          <TextField
            label="Author"
            type="text"
            fullWidth
            variant="standard"
            id="authorInput"
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Quantity"
            type="text"
            fullWidth
            variant="standard"
            id="quantityInput"
          />
        </TableCell>
        {/* <TableCell>{row.date}</TableCell> */}
        <TableCell>
          <TextField
            label="Remarks"
            type="text"
            fullWidth
            variant="standard"
            id="remarksInput"
          />
        </TableCell>

        <TableCell>
          <Box className="flex justify-center">
            <IconButton onClick={confirmSaveDialogOpenHandler}>
              <SaveAltIcon color="success" />
            </IconButton>
            <IconButton onClick={() => setIdOfEditableRow(null)}>
              <CancelIcon color="warning" />
            </IconButton>
            <IconButton onClick={confirmDeleteDialogOpenHandler}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable({ rows }: { rows: any }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [idOfEditableRow, setIdOfEditableRow] = useState(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <FormControl fullWidth>
          <DialogContent>
            <DialogContentText>
              Edit the details of the book and click on the update button.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Book Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="normal"
              id="name"
              label="Author"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              margin="normal"
              id="name"
              label="Author"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="sbmit" onClick={handleClose}>
              Subscribe
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Book Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
              {/* <TableCell sx={{ fontWeight: 600 }}>Month & Year</TableCell> */}
              <TableCell sx={{ fontWeight: 600 }}>Remarks</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) =>
                idOfEditableRow != row.id ? (
                  <Row
                    key={index}
                    row={row}
                    setDialogOpen={setDialogOpen}
                    setIdOfEditableRow={setIdOfEditableRow}
                  />
                ) : (
                  <EditableRow
                    key={index}
                    row={row}
                    setDialogOpen={setDialogOpen}
                    setIdOfEditableRow={setIdOfEditableRow}
                    idOfEditableRow={idOfEditableRow}
                  />
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
