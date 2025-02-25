import { useState } from "react";
import ModalPay from "../../pages/ModalPay";
import { useNavigate } from "react-router-dom";
import { createPayRequest } from "../../api/pay";

type CardProps = {
  id: string;
  cardType: number;
  number: string;
  balance: number;
  cvv: number;
  expiryDate: Date;
  fullName: string;
  userId: string;
};

function GetCard(type: number): string {
  let card: string;
  card = "Tarjeta ";
  switch (type) {
    case 0:
      card += "Credito";
      break;
    case 1:
      card += "Debito";
      break;
    case 2:
      card = "Visa";
      break;
    default:
      card = "Día inválido";
  }
  return card;
}

const Card = ({
  fullName,
  cardType,
  number,
  balance,
  cvv,
  userId,
  id,
  expiryDate,
}: CardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePay = () => {
    setModalOpen(true);
  };

  const handleSavePay = async (newPay: {
    amount: number;
    status: number;
    fee: number;
    details: string;
    userId: string;
    cardId: string;
  }) => {
    const resp = await createPayRequest(newPay);
    if (resp != null) navigate("/pays");
    else navigate("/login");
  };

  return (
    <div>
      <ModalPay
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePay}
        userId={userId}
        cardId={id}
        balance={balance}
      />

      <div className="card" onClick={() => handlePay()}>
        <input type="text" hidden name="userId" value={userId} />
        <h3>
          💳{GetCard(cardType)}
        </h3>
        <p className="card-number">
          {number}
        </p>
        <p className="card-holder">
          ${balance.toLocaleString()}
        </p>
        <p className="card-cvv">
          CVV {cvv}
        </p>
        <p className="card-name">
          {fullName}
        </p>
        <p className="card-expiry">
          {expiryDate.toLocaleString("en-us", { year: 'numeric', month: 'short' })}
        </p>
      </div>
    </div>
  );
};

export default Card;
