import {create} from "zustand";
import { getPays } from "../api/pay";
import { Pay } from "../types/Pay.interface";

type Store = {
  pays: Pay[];
  getPays: (userId: string) => Promise<void>;
};

export const usePayStore = create<Store>((set) => ({
   pays: [],

  getPays: async (userId: string) => {
    const res = await getPays(userId);
    set({ pays: res.data });
  },

  }));
