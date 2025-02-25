import axios from "../libs/axios";
import { CardDTO, CardRequest } from "../types/Card.interface";

export const getCardsRequest = async (userId: string) => {
  return await axios.get<CardDTO[]>(`/api/Card/${userId}`);
};

export const createCardRequest = async (card: CardRequest) => {
  const res = await axios.post("/api/Card/AddCard", card);
  return res.data;
};

export const deleteNoteRequest = async (id: string) => {
  const res = await axios.delete(`/api/Card/${id}`);
  return res.data;
};