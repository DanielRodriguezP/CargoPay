import { createUser } from "../interface/user";
import axios from "../libs/axios";

export const loginRequest = async (email: string, password: string) =>{
  return axios.post("/api/Accounts/Login", {
    email,
    password,
  })};

export const registerRequest = async (data: createUser) => {
  return await axios.post("/api/Accounts/CreateUser", data);
}

export const profileRequest = async (email: string) => {
  return await axios.get(`/api/Accounts/${email}`);
}

