export interface CardDTO {
  id: string;
  number: string;
  cvv: number;
  balance: number;
  cardType: number;
  expiryDate: Date;
  userId: string;
}

export interface CardRequest {
  number: string;
  CVV: number;
  balance: number;
  cardType: number;
  expiryDate: Date;
  userId: string;
}