import {create} from "zustand";
import { getCardsRequest, createCardRequest } from "../api/cards";
import { CardDTO, CardRequest } from "../types/Card.interface";

type Store = {
  cards: CardDTO[];
  getCards: (userId: string) => Promise<void>;
  addCard: (card: CardRequest) => void;
};

export const useCardStore = create<Store>((set) => ({
  cards: [],

  getCards: async (userId: string) => {
    const res = await getCardsRequest(userId);
    set({ cards: res.data });
  },

  addCard: async (newRecord: CardRequest) => 
      {
      await createCardRequest(newRecord);
      set((state) => ({ cards: [...state.cards, newRecord] })); 
  },

  }));
