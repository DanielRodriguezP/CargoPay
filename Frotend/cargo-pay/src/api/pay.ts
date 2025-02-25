import axios from "../libs/axios";
import { Pay, PayRequest } from "../types/Pay.interface";

export const getPays = async (userId: string) => {
    return await axios.get<Pay[]>(`/api/Pay/${userId}`);
  };
  
  export const createPayRequest = async (pay: PayRequest) => {
    const res = await axios.post("/api/Pay/AddPay", pay);
    return res.data;
  };
  