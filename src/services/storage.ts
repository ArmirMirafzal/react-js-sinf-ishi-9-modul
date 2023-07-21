import { config } from "config";

export const getSession = () => ({
	accessToken: localStorage.getItem(config.tokenKEY)!,
});

export const clearSession = () => {
	localStorage.removeItem(config.tokenKEY)!;
};

export const setSession = (accessToken: string) => {
	localStorage.setItem(config.tokenKEY, accessToken);
};
