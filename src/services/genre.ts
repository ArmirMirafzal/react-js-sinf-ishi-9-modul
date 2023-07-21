import { http } from "services";
import { IApi } from "types";

export const List = () => http.get<IApi.Genre.List.Response>("/genres");

export const Single = ({ genreID }: IApi.Genre.Single.Request) =>
	http.get<IApi.Genre.Single.Response>(`/genres/${genreID}`);
