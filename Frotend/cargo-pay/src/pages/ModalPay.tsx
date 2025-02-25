import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

export interface PayRequest {
  details: string;
  fee: number;
  amount: number;
  status: number;
  userId: string;
  cardId: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  cardId: string;
  balance: number;
  onSave: (payData: {
    amount: number;
    status: number;
    fee: number;
    details: string;
    userId: string;
    cardId: string;
  }) => void
}

function getRandomNumber(): number {
  const random = Math.random() * 2;
  return parseFloat(random.toFixed(1));
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

const ModalPay: React.FC<ModalProps> = ({ isOpen, onClose, onSave, userId, cardId, balance }: ModalProps) => {
  let fee;
  let amount = 5000;
  fee = Number(amount * getRandomNumber())

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const payData = {
      amount: Number((e.currentTarget.elements[0] as HTMLInputElement).value),
      status: Number((e.currentTarget.elements[2] as HTMLInputElement).value),
      fee: fee,
      details: (e.currentTarget.elements[1] as HTMLInputElement).value,
      userId: userId,
      cardId: cardId
    }
    onSave(payData)
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tarifa: ..................... ${fee.toLocaleString()}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Saldo: ..................... ${balance.toLocaleString()}
          </Typography>
          <div className="input-group">
            <label>Valor a pagar</label>
            <input
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label>Detalles</label>
            <input
              type="text"
            />
          </div>
          <div className="input-group">
            <label>Estado</label>
            <select name="status" required>
              <option value="0">Pendiente</option>
              <option value="1">Completado</option>
              <option value="2">Fallido</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">Pagar</button>
        </form>
      </Box>

    </Modal>
  );
}

export default ModalPay;