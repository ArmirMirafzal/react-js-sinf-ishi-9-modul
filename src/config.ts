const ENV = process.env;

export const config = {
	baseURL: ENV.REACT_APP_BASE_URL,
	tokenKEY: ENV.REACT_APP_TOKEN_KEY,
};
