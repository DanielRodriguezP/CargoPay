export interface Pay {
    id:string;
    number: string
    date: Date;
    details: string;
    fee: number;
    amount: number;
    status: number;
    userId: string;
    cardId: string;
    card: [];
  }

  export interface PayRequest {
    details: string;
    fee: number;
    amount: number;
    status: number;    
    userId: string;
    cardId: string;
  }
  