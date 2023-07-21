import { toast } from "react-hot-toast";
import { Genre, Movie } from "services";
import { IEntity } from "types";

import { Form, Loader } from "components";

interface CreateMovieState {
	title: string;
	genreId: string;
	stock: string;
	rate: string;
	genres: IEntity.Genre[];
	isLoading: boolean;
	isCreating: boolean;
}

interface CreateMovieProps {}

export default class CreateMovie extends Form<CreateMovieProps, CreateMovieState> {
	state: CreateMovieState = {
		title: "",
		genreId: "",
		stock: "",
		rate: "",
		genres: [],
		isLoading: true,
		isCreating: false,
	};

	onSubmit = async ({ title, genreId, rate, stock }: CreateMovieState) => {
		this.setState({ isCreating: true });

		try {
			await Movie.Create({
				title,
				genreId,
				dailyRentalRate: +rate,
				numberInStock: +stock,
			});
		} catch (err: any) {
			toast.error(err?.response?.data);
		} finally {
			this.setState({ isCreating: false });
		}
	};

	async componentDidMount() {
		const { data: genres } = await Genre.List();

		this.setState({ genres, isLoading: false });
	}

	render() {
		const { isLoading, genres, isCreating } = this.state;

		if (isLoading) return <Loader />;

		return (
			<>
				<h1>Create Movie</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("title", "Title")}
					{this.renderSelect("genreId", "Select Movie Genre", genres)}
					{this.renderInput("stock", "Number in Stock", "number")}
					{this.renderInput("rate", "Rate", "number")}
					{this.renderSubmit("Create", isCreating)}
				</form>
			</>
		);
	}
}
