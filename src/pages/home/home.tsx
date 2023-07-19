import { Component } from "react";
import { Link } from "react-router-dom";
import { Genre, Movie } from "services";
import { IEntity } from "types";
import { paginate } from "utils";

import { Loader } from "components";

import Pagination from "./components/pagination";
import { Genres, Movies } from "./components";

interface HomeState {
	movies: IEntity.Movie[];
	genres: IEntity.Genre[];
	isLoading: boolean;
	genreID: string;
	search: string;
	pageSize: number;
	currentPage: number;
}

interface HomeProps {
	user: IEntity.User;
}

export default class Home extends Component<HomeProps, HomeState> {
	state: HomeState = {
		movies: [],
		genres: [],
		isLoading: true,
		genreID: "all",
		search: "",
		pageSize: 3,
		currentPage: 1,
	};

	handleSelectGenre = (genreID: string) => {
		this.setState({ genreID, currentPage: 1 });
	};

	handleChangeSearch = (search: string) => {
		this.setState({ search });
	};

	handleChangePage = (currentPage: number) => {
		this.setState({ currentPage });
	};

	async componentDidMount() {
		const { data: movies } = await Movie.List();
		const { data: genres } = await Genre.List();
		// const { data: movie } = await Movie.Single({ movieID: movies[0]._id });

		this.setState({
			movies,
			genres: [{ _id: "all", name: "All Genres" }, ...genres],
			isLoading: false,
		});
	}

	filteredItems = () => {
		const { movies, genreID, search, currentPage, pageSize } = this.state;

		const filteredMovies =
			genreID === "all" ? movies : movies.filter((movie) => movie.genre._id === genreID);

		const searchedMovies = filteredMovies.filter((movie) =>
			movie.title.toLowerCase().includes(search.toLowerCase())
		);

		const paginatedMovies = paginate(searchedMovies, currentPage, pageSize);

		return { paginatedMovies, searchedMovies };
	};

	render() {
		if (this.state.isLoading) return <Loader />;

		const { genres, genreID, search, currentPage, pageSize } = this.state;
		const { user } = this.props;

		const { paginatedMovies, searchedMovies } = this.filteredItems();

		return (
			<div className="row">
				<div className="col-2">
					<Genres genreID={genreID} genres={genres} onSelectGenre={this.handleSelectGenre} />
				</div>
				<div className="col">
					{user && (
						<Link to="/new-movie" className="btn btn-primary mb-4">
							New Movie
						</Link>
					)}
					<Movies
						search={search}
						movies={paginatedMovies}
						onChangeSearch={this.handleChangeSearch}
					/>
					<Pagination
						amount={searchedMovies.length}
						currentPage={currentPage}
						pageSize={pageSize}
						onChangePage={this.handleChangePage}
					/>
				</div>
			</div>
		);
	}
}
