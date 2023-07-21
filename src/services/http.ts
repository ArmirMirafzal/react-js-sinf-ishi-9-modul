import axios from "axios";
import { config } from "config";

import { getSession } from "./storage";

export { AxiosError } from "axios";

const http = axios.create({ baseURL: config.baseURL });

http.interceptors.request.use(
	(request) => {
		const { accessToken } = getSession();

		// @ts-ignore
		request.headers = {
			...request.headers,
			...(accessToken ? { [config.tokenKEY]: accessToken } : {}),
		};

		return request;
	},
	(error) => Promise.reject(error)
);
export default http;
