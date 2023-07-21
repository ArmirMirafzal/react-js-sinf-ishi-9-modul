import { ChangeEventHandler, Component, FormEventHandler, HTMLInputTypeAttribute } from "react";
import { IEntity } from "types";
import * as yup from "yup";

import { Input, Loader, Select } from ".";

export default class Form<FormProps, FormState> extends Component<FormProps, FormState> {
	schema: yup.ObjectSchema<{}, any, {}, ""> = null as any;

	handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({ target }) => {
		this.setState({ [target.name]: target.value } as unknown as FormState);
	};

	renderSelect = (name: keyof FormState, label: string, options: IEntity.Genre[]) => (
		<Select
			name={name as string}
			label={label}
			value={this.state[name] as string}
			onChange={this.handleChange}
			options={options}
			error={(this.state as any)?.errors?.[name]}
		/>
	);

	renderSubmit = (label: string, isLoading = false) => (
		<button className="btn btn-primary" disabled={isLoading}>
			{isLoading ? <Loader /> : label}
		</button>
	);

	renderInput = (name: keyof FormState, label: string, type?: HTMLInputTypeAttribute) => (
		<Input
			value={this.state[name] as string}
			onChange={this.handleChange}
			name={name as string}
			label={label}
			type={type}
			error={(this.state as any)?.errors?.[name]}
		/>
	);

	handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();
		try {
			const result = await this.schema.validate(this.state, { abortEarly: false });

			(this as any)?.onSubmit(result);
		} catch (error: any) {
			console.log(error);
			const errors = {} as any;

			if (error instanceof yup.ValidationError) {
				error.inner.forEach(({ path, message }) => (errors[path!] = message));
				this.setState({ errors } as any);
			}
		}
	};
}
