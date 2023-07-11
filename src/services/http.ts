import axios from "axios";

const baseURL = "http://10.10.2.223:4000/api";

export const http = axios.create({ baseURL });
