import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CardList from "../components/cards/CardList";
import { useAuthStore } from "../store/auth";
import "./dashboard.css";
import ModalCreateCard from './ModalCard';
import { createCardRequest } from '../api/cards';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DashboardPage = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);


const handleSaveCard = async (newCard:{number: string;
  CVV: number;
  balance: number;
  cardType: number;
  expiryDate: Date;
  userId: string;}) => {
  const resp = await createCardRequest(newCard);
  if(resp != null)
    navigate("/pays");
  else
    navigate("/dashboard")
}

  return (
    <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={2}>
       <Grid size={4}>
          <img src="https://i.pravatar.cc/100" alt="Foto de usuario" />
          <h2>{profile.fullName}</h2>
          <p>{profile.address}</p>
          <Button variant="contained" onClick={() => {logout(), navigate("/login")}}>Cerrar Sesión</Button>
          <Button variant="contained" style={{marginTop:'10px'}} onClick={() => navigate("/pays")}>Pagos</Button>
        </Grid>
        <Grid size={8}>
           <h2>Tus Tarjetas</h2>
          <Button style={{marginBottom:'10px'}} variant="contained" onClick={() => setModalOpen(true)}>Agregar</Button>

          <CardList />
        </Grid>

        <ModalCreateCard
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveCard}
        ></ModalCreateCard>
        </Grid>
    </Box>
  );
}

export default DashboardPage;