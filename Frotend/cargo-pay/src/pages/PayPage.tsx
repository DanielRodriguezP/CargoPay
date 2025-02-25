import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usePayStore } from "../store/pays";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

function GetStatus(status: number): string {
  let statusText: string;
  statusText = "";
  switch (status) {
    case 0:
      statusText = "Pendiente";
      break;
    case 1:
      statusText = "Completado";
      break;
    case 2:
      statusText = "Fallido";
      break;
    default:
      statusText = "Inválido";
  }
  return statusText;
}

const PayPage = () => {
  const { pays, getPays } = usePayStore();
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    const fetchData = async () => {
      await getPays(profile.id);
    };
    fetchData();
  }, []);

  return (
    <Grid container>
      <KeyboardBackspaceIcon onClick={() => navigate("/dashboard")} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tarjeta número</TableCell>
              <TableCell align="right">Tarifa</TableCell>
              <TableCell align="right">Detalles</TableCell>
              <TableCell align="right">Pago</TableCell>
              <TableCell align="right">Fecha pago</TableCell>
              <TableCell align="right">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pays.map((row) => (
              <TableRow
                key={"1"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.card.number}
                </TableCell>
                <TableCell align="right">${row.fee.toLocaleString()}</TableCell>
                <TableCell align="right">{row.details}</TableCell>
                <TableCell align="right">
                  ${row.amount.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row.date.toLocaleString("en-us", { year: 'numeric', month: 'short' })}
                </TableCell>
                <TableCell align="right">{GetStatus(row.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default PayPage;
