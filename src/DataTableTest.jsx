import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DataTableTest() {
  const baseURL = "https://jsonplaceholder.typicode.com/posts";
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowdata, setRowdata] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setRows(response.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (rowdata) {
      setRows([rowdata]);
    } else {
      axios.get(baseURL).then((response) => {
        setRows(response.data);
      });
    }
  }, [rowdata]);

  return (
    <>
    {rows ? (
           <Card sx={{ minWidth: 900, m: 4 }}>
           <Box
             componenet="span"
             m={1}
             display="flex"
             justifyContent="end"
             pr={1}
             pt={1}
           >
             <Autocomplete
               disablePortal
               id="combo-box-demo"
               options={rows}
               onChange={(e, v) => setRowdata(v)}
               getOptionLabel={(rows) => rows.title || ""}
               sx={{ width: 300 }}
               renderInput={(params) => <TextField {...params} label="Movie" />}
             />
           </Box>
   
           <CardContent>
             <Paper sx={{ width: "100%", overflow: "hidden" }}>
               <TableContainer sx={{ maxHeight: 440 }}>
                 <Table stickyHeader aria-label="sticky table">
                   <TableHead>
                     <TableRow>
                       <TableCell align="left">ID</TableCell>
                       <TableCell align="left">Title</TableCell>
                       <TableCell align="left">Body</TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {rows
                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                       .map((row) => {
                         return (
                           <TableRow
                             hover
                             role="checkbox"
                             tabIndex={-1}
                             key={row.id}
                           >
                             <TableCell align="left">{row.id}</TableCell>
                             <TableCell align="left">{row.title}</TableCell>
                             <TableCell align="left">{row.body}</TableCell>
                           </TableRow>
                         );
                       })}
                   </TableBody>
                 </Table>
               </TableContainer>
               <TablePagination
                 rowsPerPageOptions={[10, 25, 100]}
                 component="div"
                 count={rows.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 onPageChange={handleChangePage}
                 onRowsPerPageChange={handleChangeRowsPerPage}
               />
             </Paper>
           </CardContent>
         </Card>
    ) : (
        <h2>Loading...</h2>
    )}
   
    </>
  );
}
