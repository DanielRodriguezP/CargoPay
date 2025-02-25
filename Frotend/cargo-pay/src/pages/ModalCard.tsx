import React, {useState} from 'react';
import { useAuthStore } from "../store/auth";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export interface CardRequest {
  number: string;
  CVV: number;
  balance: number;
  cardType: number;
  userId: string;
  expiryDate: Date;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData:{number: string;
    CVV: number;
    balance: number;
    cardType: number;
    expiryDate: Date;
    userId: string;}) => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCreateCard: React.FC<ModalProps> = ({ isOpen, onClose, onSave }: ModalProps) => {

  const profile = useAuthStore((state) => state.profile);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      
    e.preventDefault();
    var balanceDefault = 20000000;
   
    const cardData = {
      number: ( e.currentTarget.elements[0] as HTMLInputElement).value,
      CVV: Number(( e.currentTarget.elements[1] as HTMLInputElement).value),
      balance: balanceDefault,
      cardType: Number(( e.currentTarget.elements[3] as HTMLInputElement).value),
      expiryDate: new Date( (e.currentTarget.elements[2] as HTMLInputElement).value) ,
      userId: profile.id,
    }
      onSave(cardData)
      onClose();
  };
  
  return (
    <Modal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <form onSubmit={handleSubmit}>
    <div className="input-group">
        <label>Numero</label>
        <input
          type="text"
          maxlength={'15'}
          placeholder="*** *** *** *** ***"
          required
        />
    </div>
    <div className="input-group">
      <label>CVV</label>
      <input
        type="text"
        maxlength={'3'}
        placeholder="123"
        required
      />
    </div>
    <div className="input-group">
      <label>Fecha de expiración</label>
      <input
        type="date"
        required
      />
    </div>
    <div className="input-group">
      <label>Tipo de tarjeta</label>
      <select name="cardType" required>
        <option value="0">Crédito</option>
        <option value="1">Debito</option>
        <option value="2">Visa</option>
      </select>
    </div>
    <p><h3>Nota</h3>Se le asignará un saldo de acuerdo a su historial crediticio</p>
    <button type="submit" className="btn-secondary">Crear</button>
  </form>
  </Box>
    
  </Modal>
   
  );
}

export default ModalCreateCard;

